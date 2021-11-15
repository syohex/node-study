#include <napi.h>

Napi::String Test(const Napi::CallbackInfo &info) {
    Napi::Env env = info.Env();
    Napi::Object obj = Napi::Object::New(env);
    obj.Set(Napi::String::New(env, "errno"), Napi::Number::New(env, 42));
    obj.Set(Napi::String::New(env, "code"), Napi::String::New(env, "ENOENT"));
    Napi::Error error(env, obj);
    error.ThrowAsJavaScriptException();
    return Napi::String::New(env, "hello world");
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "error"), Napi::Function::New(env, Test));
    return exports;
}

NODE_API_MODULE(addon, Init);
