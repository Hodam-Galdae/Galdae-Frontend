package com.hodam.galdae

import android.app.Application
import android.content.pm.PackageManager
import android.content.pm.Signature
import android.util.Base64
import android.util.Log
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.soloader.OpenSourceMergedSoMapping
import com.facebook.soloader.SoLoader
import com.reactnativeimageresizer.ImageResizerPackage
import java.security.MessageDigest

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
              // Packages that cannot be autolinked yet can be added manually here, for example:
              // add(MyReactNativePackage())
              add(PackageInfoPackage())
            }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()

    // Print Key Hash for Kakao debugging
    printKeyHash()

    SoLoader.init(this, OpenSourceMergedSoMapping)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      load()
    }
  }

  private fun printKeyHash() {
    try {
      @Suppress("DEPRECATION")
      val info = packageManager.getPackageInfo(packageName, PackageManager.GET_SIGNATURES)
      info.signatures?.forEach { signature ->
        val md = MessageDigest.getInstance("SHA")
        md.update(signature.toByteArray())
        val keyHash = Base64.encodeToString(md.digest(), Base64.NO_WRAP)
        Log.d("KAKAO_KEY_HASH", "=============================================")
        Log.d("KAKAO_KEY_HASH", "Package: $packageName")
        Log.d("KAKAO_KEY_HASH", "Key Hash: $keyHash")
        Log.d("KAKAO_KEY_HASH", "=============================================")
      }
    } catch (e: Exception) {
      Log.e("KAKAO_KEY_HASH", "Error getting key hash", e)
    }
  }
}
