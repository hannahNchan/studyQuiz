#!/bin/sh
APP_NAME="studyQuiz"
SIGNATURE_PASSWORD="tomclancys"
SDK_BUILD_TOOLS="/Users/hannah/Library/Android/sdk/build-tools/30.0.2/zipalign"


echo "Starting"
npm run build
echo "sync"
npx cap sync
echo "copy"
npx cap copy

echo "assembleRelease"
cd android && ./gradlew assembleRelease
echo "remover"
cd ..
rm ./android/app/build/outputs/apk/release/$APP_NAME.apk

echo "jarsigner omg\n\n"
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $APP_NAME.keystore app-release-unsigned.apk $APP_NAME <<< $SIGNATURE_PASSWORD
echo "zipalign"


cd ./android/app/build/outputs/apk/release
$SDK_BUILD_TOOLS -v 4 app-release-unsigned.apk $APP_NAME.apk

open .
