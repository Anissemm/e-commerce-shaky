
const data = {
    levels: 1,
    auto: false,
    menu: {
        name: "Header Menu",
        children: [
            {
                value: { category: 'About Us' },
                itemType: 'Category',
                postsType: 'page' // to fix static pages later
            },
            {
                value: 'Shop By Goal',
                itemType: "Tag",
                postsType: 'product',
                children: [
                    {
                        value: { category: "Protein" },
                        itemType: 'Category',
                        postsType: 'product',
                        children: [
                            {
                                value: { category: 'Whey Protein' },
                                postsType: 'product',
                                itemType: 'Category'
                            },
                            {
                                value: { category: 'Beef Protein' },
                                postsType: 'product',
                                itemType: 'Category'
                            }
                        ]
                    }
                ]
            },
            {
                value: { category: "Clothing & Accessories" },
                postsType: 'product',
                itemType: "Category"
            },
            {
                value: { category: "Blog" },
                itemType: "Category",
                postsType: "blog"
            },
            {
                value: { name: 'Google', url: 'https://www.google.com' },
                itemType: "Custom_Link",
                postsType: 'external'
            }
        ]
    }
}

export default data