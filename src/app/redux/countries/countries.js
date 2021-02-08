import {
    createEntityAdapter,
    createSlice,
    createAsyncThunk,

} from '@reduxjs/toolkit'

export const REGIONS = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

export const fetchCountries = createAsyncThunk(
    'countries/fetchCountries',
    async (_, { rejectWithValue }) => {

        return await fetch('https://restcountries.eu/rest/v2/all')
            .then(async res => {
                const b = await res.json()
                return b;
            })
            .then((body) => {
                return body
            })
            .catch(err => {
                return rejectWithValue(err)
            })

    }
)


const countriesAdapter = createEntityAdapter({
    selectId: (country) => country.alpha3Code,
    sortComparer: (a, b) => a.name.localeCompare(b.name),
})

const countriesSlice = createSlice({
    name: 'countries',
    initialState: countriesAdapter.getInitialState({
        visibilityFilters: {
            query: '',
            region: ''
        },
        errors: []
    }),
    reducers: {
        countryAdded: countriesAdapter.addOne,
        queryFilterChanged: (state, action) => {
            return ({
                ...state,
                visibilityFilters:
                {
                    ...state.visibilityFilters,
                    query: action.payload
                }
            })
        },
        regionChanged: (state, action) => {
            return ({
                ...state,
                visibilityFilters:
                {
                    ...state.visibilityFilters,
                    region: action.payload
                }
            })
        }
    },
    extraReducers: {
        [fetchCountries.fulfilled]: (state, action) => {
            countriesAdapter.setAll(state, action.payload)
        },
        [fetchCountries.rejected]: (state, action) => {
            return ({ ...state, errors: [...state.errors, action.payload] })
        },

    }
})
const countriesSliceReducer = countriesSlice.reducer

export const { queryFilterChanged, regionChanged } = countriesSlice.actions


export default countriesSliceReducer;

export const countriesQueryFilterSelector = (state) => {

    if (!!!state) return;

    let query = state.countries.visibilityFilters.query;
    let countries = state.countries
    let region = state.countries.visibilityFilters.region

    if (!!!countries) return;

    let c_array = []

    for (var id of countries.ids) {
        c_array.push(countries.entities[id])
    }

    var re = new RegExp(query.trim().toLowerCase() + '.+$', 'i');

    c_array = c_array.filter(c => c.name.trim().toLowerCase().search(re) !== -1)
    c_array = c_array.filter(c => (region && region !== 'All') ? c.region.trim().toLowerCase() === region.trim().toLowerCase() : true)

    let final = {}
    final.ids = []
    final.entities = {}
    final.visibilityFilters = state.countries.visibilityFilters;

    for (var c of c_array) {
        final.ids.push(c.alpha3Code)
        final.entities[c.alpha3Code] = c
    }
    return final
} 