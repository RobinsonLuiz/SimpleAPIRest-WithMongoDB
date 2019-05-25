
let url = "http://localhost:5000/v1";
import * as httpStatus from 'http-status';

export const sendResponse = function (method, genericRoute: (...args) => any, param?, ...filters) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let response;
        descriptor.value = async (...args) => {
            try {
                let { params } = args[0].params;
                let { body, route, baseUrl, originalUrl } = args[0];
                if (param && body) response = await genericRoute(params, body);
                else if (body && !params) response = await genericRoute(body);
                else response = await genericRoute(params);
                if (response) return args[1].status(httpStatus.OK).json(response, [
                    { rel: "self", method, href: `${url}${baseUrl}` },
                    { rel: route.stack[0].method, method, title: 'Generic', href: `${url}${originalUrl}` }
                ]);
                else return args[1].status(httpStatus.NOT_FOUND).json(response, [
                    { rel: "self", method, href: `${url}${baseUrl}` },
                    { rel: route.stack[0].method, method, title: 'Generic', href: `${url}${originalUrl}` }
                ]);
            } catch (err) {
                args[1].status(httpStatus.INTERNAL_SERVER_ERROR).json({ "Erro": err });
            }
        };
    }
};