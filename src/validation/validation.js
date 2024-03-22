import { ResponseError } from "../exception/response-error";

export async function validation (schema, request) {
    const result = schema.validate(request, {abortEarly: false});
    if(result.error){
        throw new ResponseError(400, result.error.message)
    }else {
        return result.value;
    }
}