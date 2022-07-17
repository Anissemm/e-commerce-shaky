
const data = {
    levels: 1,
    auto: false,
    menu: {
        name: "Header Menu",
        children: [
            {
                value: { value: 'endurance', parent: '62d450667b5cf0f27b30545e'},
                itemType: "Category"
            },
            {
                value: "vitality",
                itemType: "Tag",
                children: [
                    {
                        value: "vita",
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