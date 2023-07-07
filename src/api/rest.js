const BaseUrl = `http://localhost:3000/api/v1`

const Endpoint = {
    Testing: "testing",
    Tenant: "tenants",
    Subscriptions: "subscriptions",
}

export const HttpCode = {
    StatusOK: 200,
    StatusCreated: 201,
    StatusBadRequest: 400,
    StatusUnauthorized: 401,
    StatusNotFound: 404,
    StatusUnprocessableEntity: 422,
    StatusInternalServerError: 500,
}

export const getValidationAccess = (tenantId) =>  fetch(
    `${BaseUrl}/${Endpoint.Testing}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-TENANT-ID': tenantId,
        },
        credentials: 'include',
    })

export const postTenantDetail = (tenantId, form) =>  fetch(
    `${BaseUrl}/${Endpoint.Tenant}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-TENANT-ID': tenantId,
        },
        body: JSON.stringify(form)
    }
)

export const getTenantDetail = (tenantId) =>  fetch(
    `${BaseUrl}/${Endpoint.Tenant}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'X-TENANT-ID': tenantId,
    },
    credentials: 'include',
})