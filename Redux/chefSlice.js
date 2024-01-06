import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mealTitle: '',
    image: null,
    expiration: '',
    price: '',
    portions: 0,
    ingredients: {
        dairy: false,
        eggs: false,
        fish: false,
        crustaceans: false,
        treeNuts: false,
        peanuts: false,
        wheat: false,
        soybeans: false,
        sesame: false,
        meat: false
    },
    description: '',
    meals: null,
    acceptingOrders: true
}

export const chefSlice = createSlice({
    name: 'chef',
    initialState,
    reducers: {


        enterMealTitle: (state, action) => {
            state.mealTitle = action.payload.target.value;
        },
        enterPortions: (state, action) => {
            state.portions = action.payload.target.value;
        },
        enterExpiration: (state, action) => {
            state.expiration = action.payload.target.value;
        },
        enterPrice: (state, action) => {
            state.price = action.payload.target.value;
        },
        enterDescription: (state, action) => {
            state.description = action.payload.target.value;
        },
        toggleDairy: (state) => {
            state.ingredients.dairy = !state.ingredients.dairy
        },
        toggleEggs: (state) => {
            state.ingredients.eggs = !state.ingredients.eggs
        },
        toggleFish: (state) => {
            state.ingredients.fish = !state.ingredients.fish
        },
        toggleCrustaceans: (state) => {
            state.ingredients.crustaceans = !state.ingredients.crustaceans
        },
        toggleTreeNuts: (state) => {
            state.ingredients.treeNuts = !state.ingredients.treeNuts
        },
        togglePeanuts: (state) => {
            state.ingredients.peanuts = !state.ingredients.peanuts
        },
        toggleWheat: (state) => {
            state.ingredients.wheat = !state.ingredients.wheat
        },
        toggleSoybeans: (state) => {
            state.ingredients.soybeans = !state.ingredients.soybeans
        },
        toggleSesame: (state) => {
            state.ingredients.sesame = !state.ingredients.sesame
        },
        toggleMeat: (state) => {
            state.ingredients.meat = !state.ingredients.meat
        },
        addImage: (state, action) => {
            state.image = action.payload
        },
        refreshMeals: (state, action) => {
            state.meals = action.payload
        },
        setAcceptingOrders: (state, action) => {
            state.acceptingOrders = action.payload
        },
        reset: (state) => {

            state.mealTitle = '',
                state.image = null,
                state.price = '',
                state.expiration = '',
                state.ingredients = {
                    dairy: false,
                    eggs: false,
                    fish: false,
                    crustaceans: false,
                    treeNuts: false,
                    peanuts: false,
                    wheat: false,
                    soybeans: false,
                    sesame: false,
                    meat: false
                },
                state.description = '',
                state.meals = state.meals




        }


    },
});


// destructuring to export each action based on reducer functions
export const { setAcceptingOrders, enterPortions, refreshMeals, reset, addImage, enterMealTitle, enterDescription, enterExpiration, enterPrice, toggleCrustaceans, toggleDairy, toggleEggs, toggleFish, toggleMeat, togglePeanuts, toggleSesame, toggleSoybeans, toggleTreeNuts, toggleWheat } = chefSlice.actions;

export default chefSlice.reducer;

