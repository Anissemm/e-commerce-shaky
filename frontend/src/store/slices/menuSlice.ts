import apiSlice from "../api/apiSlice"

const menuApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getHeaderMenu: builder.query<any, void>({
            query: () => 'v1/menu/header_menu'
        })
    })
})

export const { useGetHeaderMenuQuery } = menuApi