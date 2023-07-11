const BaseUrl = `http://localhost:3000/api/v1`

const Endpoint = {
    Dashboard: "dashboard",
    Tenant: "tenants",
    Subscriptions: "subscriptions",
    Plans: "plans",
    Make: "make",
    Manage: "manage",
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

export const getPlans = (jwt) =>  fetch(
    `${BaseUrl}/${Endpoint.Plans}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
        credentials: 'include',
    })

export const postTenantDetail = (jwt, form) =>  fetch(
    `${BaseUrl}/${Endpoint.Tenant}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify(form)
    }
)

export const getTenantDetail = (jwt) =>  fetch(
    `${BaseUrl}/${Endpoint.Tenant}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
    },
    credentials: 'include',
})

export const postMakeSubscription = (jwt, form) =>  fetch(
    `${BaseUrl}/${Endpoint.Subscriptions}/${Endpoint.Make}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify(form)
    }
)

export const postManageBilling = (jwt) =>  fetch(
    `${BaseUrl}/${Endpoint.Subscriptions}/${Endpoint.Manage}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify({})
    }
)

export const getDashboard = (jwt) =>  fetch(
    `${BaseUrl}/${Endpoint.Dashboard}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
        credentials: 'include',
    })