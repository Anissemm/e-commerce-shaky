
const data = {
    levels: 1,
    auto: false,
    menu: {
        name: "Header Menu",
        children: [
            {
                value: { category: 'endurance', parent: '62d5901b27d127c1b74189a1' },
                itemType: "Category"
            },
            {
                value: "vitality",
                itemType: "Tag",
                children: [
                    {
                        value: { category: "vita" },
                        itemType: "Category"
                    },
                    {
                        value: "lity",
                        itemType: "Tag",
                        children: [
                            {
                                value: "cata",
                                itemType: "Tag"
                            },
                            {
                                value: "vitacat",
                                itemType: "Tag"
                            }
                        ]
                    },
                ]
            },
            {
                value: "Yandex",
                itemType: "Tag",
                children: [
                    {
                        value: "strength",
                        itemType: "Tag"
                    }
                ]
            }
        ]
    }
}

export default data