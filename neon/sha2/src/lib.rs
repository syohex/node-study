use neon::prelude::*;
use sha2::{Sha256, Digest};

fn sha2_string(mut cx: FunctionContext) -> JsResult<JsString> {
    let input = cx.argument::<JsString>(0)?.value(&mut cx);
    let mut hasher = Sha256::new();
    hasher.update(input.into_bytes());
    let result = hasher.finalize();
    Ok(cx.string(format!("{:x}", result)))
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("sha256_string", sha2_string)?;
    Ok(())
}
