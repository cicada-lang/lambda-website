import { __awaiter } from "tslib";
import { Mod, ModLoader } from "@cicada-lang/lambda/lib/lang/mod";
import { ParsingError } from "@cicada-lang/sexp/lib/errors";
const loader = new ModLoader();
export class PlaygroundState {
    constructor() {
        Object.defineProperty(this, "mod", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Mod(new URL(window.location.href), { loader })
        });
        Object.defineProperty(this, "text", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "output", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "error", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                delete this.error;
                this.mod = yield loader.load(new URL(window.location.href), {
                    text: this.text,
                });
            }
            catch (error) {
                this.catchError(error);
            }
        });
    }
    catchError(error) {
        if (!(error instanceof Error))
            throw error;
        if (error instanceof ParsingError) {
            this.error = {
                kind: "ParsingError",
                message: error.message + "\n" + error.span.report(this.text),
            };
        }
        else {
            this.error = {
                kind: error.name,
                message: error.message,
            };
        }
    }
}
