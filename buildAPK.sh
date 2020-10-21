#!/bin/sh
APP_NAME="studyQuiz"
SIGNATURE_PASSWORD="tomclancys"
SDK_BUILD_TOOLS="/Users/hannah/Library/Android/sdk/build-tools/30.0.2/zipalign"


echo "Starting \e[31mRed"
npm run build
echo "sync \e[31mRed"
npx cap sync
echo "copy \e[31mRed"
npx cap copy

echo "assembleRelease \e[31mRed"
cd android && ./gradlew assembleRelease
echo "remover \e[31mRed"
cd ..
rm ./android/app/build/outputs/apk/release/$APP_NAME.apk

echo "jarsigner \e[31mRed"
cd android/app/build/outputs/apk/release
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $APP_NAME.keystore app-release-unsigned.apk $APP_NAME <<< $SIGNATURE_PASSWORD



echo "zipalign \e[31mRed"

cd ./android/app/build/outputs/apk/release
$SDK_BUILD_TOOLS -v 4 app-release-unsigned.apk $APP_NAME.apk

open .
