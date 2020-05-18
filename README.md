# Notes

* [https://pgicons.abiro.com](https://pgicons.abiro.com) used to generate icons and SplashScreen.
* Selecting the cordova version (+android version) fixes plugins/permissions problems `<preference name="phonegap-version" value="cli-7.1.0" />`
* Checking the logs on the build page tells a lot about issues
* `build.phonegap.com` doesn't require adding platforms, etc. Only `config.xml` is required.

# Signing

http://docs.phonegap.com/phonegap-build/signing/android/
https://outlandish.com/blog/tutorial/generating-a-keystore-and-key-hash-for-phonegap/

Download JDK: https://www.oracle.com/java/technologies/javase-jdk14-downloads.html

```bash
keytool -genkey -v -keystore key.keystore -alias key -keyalg RSA -keysize 2048 -validity 10000
```
