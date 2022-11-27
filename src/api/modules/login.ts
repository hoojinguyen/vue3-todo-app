import service from "@/api/http"

const loginApi = {
    // Verify the login instance
    postVerification: (params: object) => service.post(`/login`, params),
}

export default loginApi
