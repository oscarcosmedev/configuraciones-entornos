import { http, HttpResponse } from 'msw'
import type { EditConfigFilter, TransferConfig, Entry } from '../types'
import type { ConfigResult } from '../store/edicion-store'


// Simulamos la "base de datos" en memoria
let mockEditConfigs : ConfigResult[] = [
    {
        id: 1,
        clusterName: 'AF-DEV',
        applicationName: 'Producto Web',
        artefacto: 'Producto Web',
        key: 'DatosAF:Conneccion-String',
        value: 'Host=…;Port=5672',
    },
    {
        id: 2,
        clusterName: 'AF-QA',
        applicationName: 'Producto MotorCons',
        artefacto: 'Producto MotorCons',
        key: 'Logging:LogLevel:System',
        value: 'HostName=it-rabbit01.nosis.interno;VirtualHost',
    },
    {
        id: 3,
        clusterName: 'AF-SM',
        applicationName: 'Producto Web',
        artefacto: 'Producto Web',
        key: 'DatosAF:ConectionString',
        value: 'Data Source=172.16.7.148;Initial Catalog=DatosAF;UserName',
    },
    // {
    //     id: 4,
    //     clusterName: 'AF-DEV',
    //     applicationName: 'Producto Web',
    //     artefacto: 'Producto Web',
    //     key: 'DatosAF:Conneccion-String',
    //     value: 'Host=…;Port=5672',
    // },
    // {
    //     id: 5,
    //     clusterName: 'AF-QA',
    //     applicationName: 'Producto MotorCons',
    //     artefacto: 'Producto MotorCons',
    //     key: 'Logging:LogLevel:System',
    //     value: 'HostName=it-rabbit01.nosis.interno;VirtualHost',
    // },
    // {
    //     id: 6,
    //     clusterName: 'AF-SM',
    //     applicationName: 'Producto Web',
    //     artefacto: 'Producto Web',
    //     key: 'DatosAF:ConectionString',
    //     value: 'Data Source=172.16.7.148;Initial Catalog=DatosAF;UserName',
    // },
    // {
    //     id: 7,
    //     clusterName: 'AF-DEV',
    //     applicationName: 'Producto Web',
    //     artefacto: 'Producto Web',
    //     key: 'DatosAF:Conneccion-String',
    //     value: 'Host=…;Port=5672',
    // },
    // {
    //     id: 8,
    //     clusterName: 'AF-QA',
    //     applicationName: 'Producto MotorCons',
    //     artefacto: 'Producto MotorCons',
    //     key: 'Logging:LogLevel:System',
    //     value: 'HostName=it-rabbit01.nosis.interno;VirtualHost',
    // },
    // {
    //     id: 9,
    //     clusterName: 'AF-SM',
    //     applicationName: 'Producto Web',
    //     artefacto: 'Producto Web',
    //     key: 'DatosAF:ConectionString',
    //     value: 'Data Source=172.16.7.148;Initial Catalog=DatosAF;UserName',
    // },
    // {
    //     id: 10,
    //     clusterName: 'AF-DEV',
    //     applicationName: 'Producto Web',
    //     artefacto: 'Producto Web',
    //     key: 'DatosAF:Conneccion-String',
    //     value: 'Host=…;Port=5672',
    // },
    // {
    //     id: 11,
    //     clusterName: 'AF-QA',
    //     applicationName: 'Producto MotorCons',
    //     artefacto: 'Producto MotorCons',
    //     key: 'Logging:LogLevel:System',
    //     value: 'HostName=it-rabbit01.nosis.interno;VirtualHost',
    // },
    // {
    //     id: 12,
    //     clusterName: 'AF-SM',
    //     applicationName: 'Producto Web',
    //     artefacto: 'Producto Web',
    //     key: 'DatosAF:ConectionString',
    //     value: 'Data Source=172.16.7.148;Initial Catalog=DatosAF;UserName',
    // },
    // {
    //     id: 13,
    //     clusterName: 'AF-QA',
    //     applicationName: 'Producto MotorCons',
    //     artefacto: 'Producto MotorCons',
    //     key: 'Logging:LogLevel:System',
    //     value: 'HostName=it-rabbit01.nosis.interno;VirtualHost',
    // },
    // {
    //     id: 14,
    //     clusterName: 'AF-SM',
    //     applicationName: 'Producto Web',
    //     artefacto: 'Producto Web',
    //     key: 'DatosAF:ConectionString',
    //     value: 'Data Source=172.16.7.148;Initial Catalog=DatosAF;UserName',
    // },
    // {
    //     id: 15,
    //     clusterName: 'AF-DEV',
    //     applicationName: 'Producto Web',
    //     artefacto: 'Producto Web',
    //     key: 'DatosAF:Conneccion-String',
    //     value: 'Host=…;Port=5672',
    // },
    // {
    //     id: 16,
    //     clusterName: 'AF-QA',
    //     applicationName: 'Producto MotorCons',
    //     artefacto: 'Producto MotorCons',
    //     key: 'Logging:LogLevel:System',
    //     value: 'HostName=it-rabbit01.nosis.interno;VirtualHost',
    // },
    // {
    //     id: 17,
    //     clusterName: 'AF-SM',
    //     applicationName: 'Producto Web',
    //     artefacto: 'Producto Web',
    //     key: 'DatosAF:ConectionString',
    //     value: 'Data Source=172.16.7.148;Initial Catalog=DatosAF;UserName',
    // },
    // {
    //     id: 18,
    //     clusterName: 'AF-DEV',
    //     applicationName: 'Producto Web',
    //     artefacto: 'Producto Web',
    //     key: 'DatosAF:Conneccion-String',
    //     value: 'Host=…;Port=5672',
    // },
    // {
    //     id: 19,
    //     clusterName: 'AF-QA',
    //     applicationName: 'Producto MotorCons',
    //     artefacto: 'Producto MotorCons',
    //     key: 'Logging:LogLevel:System',
    //     value: 'HostName=it-rabbit01.nosis.interno;VirtualHost',
    // },
    // {
    //     id: 20,
    //     clusterName: 'AF-SM',
    //     applicationName: 'Producto Web',
    //     artefacto: 'Producto Web',
    //     key: 'DatosAF:ConectionString',
    //     value: 'Data Source=172.16.7.148;Initial Catalog=DatosAF;UserName',
    // },
    // ...
]

const valorOptionsByCampo: Record<string, string[]> = {
    ClusterName: [
        'ClusterA', 
        'ClusterB', 
        'ClusterC', 
        'ClusterD'
    ],
    AppName: [
        'App1', 
        'App2', 
        'App3', 
        'App4'
    ],
    Key: [
        'Config1', 
        'Config2', 
        'Config3', 
        'Config4'
    ],
    Value: [
        'http://168.12.7.51:5317', 
        'IT.Service', 
        'Error', 
        'HostName=168.12.7.51'
    ]
}

export const handlers = [

    /** -------------------------- PREVIEW ------------------------- */
    http.get('/api/preview/appName', () =>
        HttpResponse.json<string[]>([
            'AF-DEV',
            'AF-QA',
            'AF-SM',
            'ER-Test'
        ])
    ),

    http.get('/api/preview/clusterName', () =>
        HttpResponse.json<string[]>([
            'AF-QA', 'AF-PROD', 'QA-INT', 'PROD-INT'
        ])
    ),

    http.get('/api/preview/config', () => {
        return HttpResponse.json({
            clusterName: 'AF-PROD-holi',
            appName: 'App-X',
            key: 'config.key',
            value: '123.456.789.000',
        })
    }),

    /** --------------------------- EDICION -------------------------- */
    
    /** opciones para filtrar */
    http.get('/api/options/campos', () =>
        HttpResponse.json<string[]>([
            'ClusterName',
            'AppName',
            'Key',
            'Value'
        ])
    ),

    http.get('/api/options/operadores', () =>
        HttpResponse.json<string[]>([
            '=',
            '<>',
            'Contiene',
            'No contiene'
        ])
    ),

    http.get('/api/options/valores', () =>
        HttpResponse.json(valorOptionsByCampo)
    ),

    /** Búsqueda de configuraciones */
    http.post('/api/config', async ({ request }) => {
        
        const { filters } = (await request.json()) as { filters: EditConfigFilter[] }
        
        if (process.env.NODE_ENV === 'development') {
            return HttpResponse.json(mockEditConfigs)
        } else {
            return HttpResponse.json(filters)
        }
    }),

    /** Editar/Actualizar el valor */
    http.post('/api/edit-config', async ({ request }) => {
        
        const { id, value } = await request.json() as { id: number; value: string }
        const item = mockEditConfigs.find(campo => campo.id === id)
        
        if (item) item.value = value
        //console.log(`MSW: actualizar id=${id} → ${value}`)
        return HttpResponse.json(mockEditConfigs)
        
    }),

    /** Eliminar config */
    http.post('/api/delete-config', async ({ request }) => {

        const { id } = await request.json() as { id: number }
        mockEditConfigs = mockEditConfigs.filter(campo => campo.id !== id)
        // console.log(`MSW: eliminar id=${id}`)
        return HttpResponse.json(mockEditConfigs)
        
    }),

    /** Agregar configuración */
    http.post('/api/add-config', async ({ request }) => {
        
        const newEntry = (await request.json()) as Entry
        const nextId = mockEditConfigs.reduce((max, cfg) => Math.max(max, cfg.id), 0) + 1

        const created: ConfigResult = {
            id: nextId,
            artefacto: '',
            ...newEntry,
        }

        mockEditConfigs = [created, ...mockEditConfigs]
        return HttpResponse.json(mockEditConfigs)
    }),


    /** -------------------------------- TRASLADO -------------------------- */
    http.get('/api/transfer/clusterName', () =>
        HttpResponse.json<string[]>([
            'AF-QA', 'AF-PROD', 'QA-INT', 'PROD-INT'
        ])
    ),

    http.get('/api/transfer/appName', () =>
        HttpResponse.json<string[]>([
            'app-1',
            'app-2',
            'app-A',
            'app-B'
        ])
    ),
    http.post('/api/transfer', async ({ request }) => {
        const config = (await request.json()) as TransferConfig
        // console.log('MSW: traspaso recibido', config)

        return HttpResponse.json<{
            success: boolean
            message: string
            config: TransferConfig
        }>({
            success: true,
            message: 'Transferencia iniciada con éxito',
            config
        })
    }),
]