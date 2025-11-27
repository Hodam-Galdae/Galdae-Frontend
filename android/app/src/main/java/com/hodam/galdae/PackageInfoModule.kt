package com.hodam.galdae

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

class PackageInfoModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "PackageInfo"
    }

    override fun getConstants(): Map<String, Any> {
        return mapOf(
            "packageName" to reactApplicationContext.packageName
        )
    }
}
