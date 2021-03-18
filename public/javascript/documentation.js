$(document).ready(() => {
    window.ui = SwaggerUIBundle({
        url: "/dpdb-openapi.yaml",
        dom_id: '.swagger-ui',
        presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
        ]
    })
})