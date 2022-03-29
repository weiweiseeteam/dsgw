import { createStore } from 'vuex'

const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocaCartList = () => {
  // { shopId: {shopName:'', productList:{ productId: {} }}}
  try {
    return JSON.parse(localStorage.cartList)
  } catch (e) {
    return {}
  }
}

export default createStore({
  state: {
    cartList: getLocaCartList()
    // {
    // shopId: {
    //   productId: {
    //     name: '',
    //     imgUrl: '',
    //     sales: 0,
    //     price: 0.0,
    //     oldPrice: 0.0,
    //     count: 0,
    //     shopName
    //   }
    // }
    // }
  },
  getters: {
  },
  mutations: {
    addItemToCart: (state, params) => {
      const { shopId, productId, item, shopName } = params

      const shopInfo = state.cartList?.[shopId] || {}
      let productInfo = shopInfo[productId]
      if (!productInfo) {
        productInfo = item
        productInfo.count = 0
        productInfo.checked = true
      }
      productInfo.count++
      productInfo.shopName = shopName
      shopInfo[productId] = productInfo
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    minusItemToCart: (state, params) => {
      const { shopId, productId } = params
      if (state.cartList?.[shopId]?.[productId]) {
        if (state.cartList?.[shopId]?.[productId].count > 0) {
          state.cartList[shopId][productId].count--
        }
      }
      setLocalCartList(state)
    },
    changeChecked: (state, params) => {
      const { shopId, productId } = params
      if (state.cartList?.[shopId]?.[productId]) {
        state.cartList[shopId][productId].checked = !state.cartList[shopId][productId].checked
      }
      setLocalCartList(state)
    },
    clearCart: (state, params) => {
      const { shopId } = params
      if (state.cartList?.[shopId]) {
        delete state.cartList[shopId]
      }
      setLocalCartList(state)
    },
    allCart: (state, params) => {
      const { shopId } = params
      if (state.cartList?.[shopId]) {
        const products = state.cartList[shopId]
        for (const i in products) {
          products[i].checked = true
        }
      }
      setLocalCartList(state)
    }
  },
  actions: {
  },
  modules: {
  }
})
