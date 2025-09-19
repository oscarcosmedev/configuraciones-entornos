export default {
    // Permite múltiples pasadas de optimización
    multipass: true,
    // Control de salida SVG
    js2svg: {
        pretty: false,
        indent: 2,
    },
    // Plugins y configuración de SVGO
    plugins: [
        {
            name: 'preset-default',
            params: {
                overrides: {
                    removeDimensions: true
                }
            }
        },
        {
            name: 'addAttributesToSVGElement',
            params: {
                attributes: [
                    {
                        fill: 'currentColor'
                    }
                ]
            }
        }
    ]
};