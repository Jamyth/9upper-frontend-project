import { ErrorHandler as ReactShibaErrorHandler } from "react-shiba";
import type { Exception } from "react-shiba";

export class ErrorHandler implements ReactShibaErrorHandler {
    onError(exception: Exception) {
        console.info("hahahahhaha");
    }
}
