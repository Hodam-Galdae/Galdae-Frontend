# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# Note: the configuration keeps the entry point 'okio.AsyncTimeout { void scheduleTimeout(okio.AsyncTimeout,long,boolean); }', but not the descriptor class 'okio.AsyncTimeout
-dontwarn okio.**
# Note: the configuration keeps the entry point 'okhttp3.internal.ws.WebSocketWriter$FrameSink { void write(okio.Buffer,long); }', but not the descriptor class 'okio.Buffer'
-dontwarn okhttp3.**

# Google Sign-In
-keep class com.google.android.gms.auth.api.signin.** { *; }
-keep interface com.google.android.gms.auth.api.signin.** { *; }
-keep class com.google.android.gms.common.api.** { *; }
-keep class com.google.android.gms.common.internal.** { *; }

# Kakao SDK
-keep class com.kakao.** { *; }
-keepattributes Signature
-keepclassmembers class * {
  public static <fields>;
  public *;
}
-dontwarn com.kakao.**

# React Native Kakao Login
-keep class com.kakaologin.** { *; }
-keep class com.reactnativeseoullibrary.** { *; }

# Naver Login SDK - Comprehensive rules to prevent ClassCastException
-keep class com.naver.** { *; }
-keep class com.navercorp.** { *; }
-keep class com.nhn.android.** { *; }
-keep interface com.naver.** { *; }
-keep interface com.navercorp.** { *; }

-keepclassmembers class com.naver.** { *; }
-keepclassmembers class com.navercorp.** { *; }

# Critical: Preserve all type information for reflection
-keepattributes Signature
-keepattributes *Annotation*
-keepattributes InnerClasses
-keepattributes EnclosingMethod

# Preserve generic type information
-keepattributes Exceptions,InnerClasses,Signature,Deprecated,SourceFile,LineNumberTable,*Annotation*,EnclosingMethod

# React Native Seoul Naver Login bridge
-keep class com.navercorp.nid.** { *; }
-keep class com.reactnativeseoullibrary.RNSNaverLoginModule { *; }
-keep class com.reactnativeseoullibrary.** { *; }

# Keep all enums
-keepclassmembers enum com.naver.** { *; }
-keepclassmembers enum com.navercorp.** { *; }

-dontwarn com.naver.**
-dontwarn com.navercorp.**
-dontwarn com.nhn.android.**

# Firebase
-keep class com.google.firebase.** { *; }
-keep class com.google.android.gms.** { *; }
-dontwarn com.google.firebase.**
-dontwarn com.google.android.gms.**

# React Native Firebase
-keep class io.invertase.firebase.** { *; }
-dontwarn io.invertase.firebase.**

# Notifee (Push Notifications)
-keep class app.notifee.** { *; }
-dontwarn app.notifee.**

# WebSocket & STOMP
-keep class org.java_websocket.** { *; }
-keep class org.stomp.** { *; }
-dontwarn org.java_websocket.**
-dontwarn org.stomp.**

# SockJS Client
-keep class com.github.sockjs.** { *; }
-dontwarn com.github.sockjs.**

# Axios & Networking
-keepattributes Signature
-keepattributes *Annotation*
-keep class retrofit2.** { *; }
-keep class okhttp3.** { *; }
-keep class okio.** { *; }

# React Native Reanimated
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }

# React Native Gesture Handler
-keep class com.swmansion.gesturehandler.** { *; }

# React Native SVG
-keep class com.horcrux.svg.** { *; }

# React Native Video
-keep class com.brentvatne.** { *; }
-dontwarn com.brentvatne.**

# React Native WebView
-keep class com.reactnativecommunity.webview.** { *; }
-dontwarn com.reactnativecommunity.webview.**

# React Native Encrypted Storage
-keep class com.emeraldsanto.encryptedstorage.** { *; }

# React Native Image Picker
-keep class com.imagepicker.** { *; }
-dontwarn com.imagepicker.**

# React Native Image Resizer
-keep class fr.bamlab.rnimageresizer.** { *; }

# React Native Permissions
-keep class com.zoontek.rnpermissions.** { *; }

# Redux Toolkit & Serialization
-keepattributes *Annotation*, InnerClasses
-dontnote kotlinx.serialization.AnnotationsKt
-keepclassmembers class kotlinx.serialization.json.** {
    *** Companion;
}
-keepclasseswithmembers class kotlinx.serialization.json.** {
    kotlinx.serialization.KSerializer serializer(...);
}

# React Native New Architecture (if enabled)
-keep class com.facebook.react.fabric.** { *; }
-keep class com.facebook.react.uimanager.** { *; }

# Hermes Engine
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }

# Keep Attributes for Reflection
-keepattributes Signature
-keepattributes Exceptions
-keepattributes InnerClasses
-keepattributes SourceFile
-keepattributes LineNumberTable

# Preserve crash stack traces
-keepattributes SourceFile,LineNumberTable
-keep public class * extends java.lang.Exception

# Remove Log statements (optional - for production)
# -assumenosideeffects class android.util.Log {
#     public static *** d(...);
#     public static *** v(...);
#     public static *** i(...);
# }