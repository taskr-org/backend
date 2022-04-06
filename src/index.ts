import { getWrappedApp, Logger } from "hyougen"
import { NonBodiedContext } from "hyougen/lib/routers";
import koa from "koa";

const TAG = "src/main.ts"

async function main(){
    const app = getWrappedApp(new koa(), true);

    app.get("/", (ctx: NonBodiedContext) => {
        ctx.hyRes.success("Hello, World!")
    })

    const PORT = 8080
    app.Listen(PORT, () => {
        Logger.success(`Server started on PORT ${PORT}`, TAG)
    })
}

main();