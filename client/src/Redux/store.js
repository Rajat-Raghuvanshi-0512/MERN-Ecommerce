import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { cartReducer } from "./Reducers/cartReducer"
import { allOrdersReducer, getSingleOrderReducer, myOrdersReducer, newOrderReducer, orderReducer } from "./Reducers/orderReducer"
import { createProductReducer, productReducer, productsReducer, reviewReducer, similarProductsReducer, singleProductReducer } from "./Reducers/productReducer"
import { allUserReducer, forgotPasswordReducer, profileReducer, singleUserReducer, userReducer } from "./Reducers/userReducer"

const reducer = combineReducers({
    allProducts: productsReducer,
    singleProductDetails: singleProductReducer,
    userInfo: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: getSingleOrderReducer,
    review: reviewReducer,
    allOrders: allOrdersReducer,
    allUsers: allUserReducer,
    newProduct: createProductReducer,
    product: productReducer,
    order: orderReducer,
    user: singleUserReducer,
    similarProducts: similarProductsReducer
})
let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {}
    }
}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;