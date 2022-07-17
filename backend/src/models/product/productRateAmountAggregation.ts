import { PipelineStage } from "mongoose"

const rateCountAndAmount: Array<PipelineStage | any> = [
    {
        $addFields: {
            'rate.count': {
                $size: '$rate.values'
            }
        }
    }, {
        $lookup: {
            from: 'product_rates',
            localField: 'rate.values',
            foreignField: '_id',
            as: 'rate.values'
        }
    }, {
        $addFields: {
            'rate.amount': {
                $divide: [
                    {
                        $ceil: {
                            $multiply: [
                                {
                                    $cond: [
                                        {
                                            $eq: [
                                                '$rate.count', 0
                                            ]
                                        }, 0, {
                                            $divide: [
                                                {
                                                    $reduce: {
                                                        input: '$rate.values',
                                                        initialValue: 0,
                                                        in: {
                                                            $add: [
                                                                '$$value', '$$this.rate'
                                                            ]
                                                        }
                                                    }
                                                }, '$rate.count'
                                            ]
                                        }
                                    ]
                                }, 10
                            ]
                        }
                    }, 10
                ]
            }
        }
    }, {
        $project: {
            'rate.values': 0
        }
    }
]

export default rateCountAndAmount