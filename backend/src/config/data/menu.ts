
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
                value: { category: "Protein" },
                itemType: 'Category',
                postsType: 'product',
                children: [
                    {
                        value: { category: 'Whey Protein' },
                        postsType: 'product',
                        itemType: 'Category',
                        children: [
                            {
                                value: { category: 'Whey Protein Isolate' },
                                postsType: 'product',
                                itemType: 'Category'
                            },
                            {
                                value: { category: 'Premium Whey' },
                                postsType: 'product',
                                itemType: 'Category'
                            },
                            {
                                value: { category: 'Hydrolyzed Whey Protein' },
                                postsType: 'product',
                                itemType: 'Category'
                            },
                            {
                                value: { category: 'Diet Whey' },
                                postsType: 'product',
                                itemType: 'Category'
                            }
                        ]
                    },

                    {
                        value: { category: 'Casein Protein' },
                        postsType: 'product',
                        itemType: 'Category'
                    },
                    {
                        value: { category: 'Ready to drink shakes' },
                        postsType: 'product',
                        itemType: 'Category'
                    },
                    {
                        value: { category: 'Weight gainers' },
                        postsType: 'product',
                        itemType: 'Category'
                    },
                    {
                        value: { category: 'Vegan Protein' },
                        postsType: 'product',
                        itemType: 'Category'
                    },
                    {
                        value: { category: 'Beef Protein' },
                        postsType: 'product',
                        itemType: 'Category'
                    },
                    {
                        value: { category: 'Protein Bars' },
                        postsType: 'product',
                        itemType: 'Category'
                    }
                ]
            },
            {
                value: { category: "Performance" },
                itemType: "Category",
                postsType: "product"
            },
            {
                value: { category: 'Weight Management' },
                itemType: "Category",
                postsType: 'product'
            },
            {
                value: { category: 'Vitamins & Health' },
                itemType: "Category",
                postsType: 'product'
            },
            {
                value: { category: "Clothing & Accessories" },
                itemType: "Category",
                postsType: 'product'
            },
        ]
    }
}

export default data