const env = import.meta.env.MODE || "prod"
const EnvConfig ={
    dev:{               //开发环境
        baseApi:'/',
        mockApi:'https://www.fastmock.site/mock/9b60c02694d16228f791028be6a78872/api'

    },
    test:{               //测试环境
        baseApi:'/',
        mockApi:'https://www.fastmock.site/mock/9b60c02694d16228f791028be6a78872/api'


    },
    prod:{               //生产环境
        baseApi:'/',
        mockApi:''


    }
}
export default{
    env,
    mock:true,
    ...EnvConfig[env]
}