FROM reactnativecommunity/react-native-android:latest
WORKDIR /mobile
COPY package.json /mobile
RUN npm install --legacy-peer-deps
COPY . /mobile
WORKDIR /mobile/android
RUN chmod +x ./gradlew
CMD ./gradlew assembleRelease; mv /mobile/android/app/build/outputs/apk/release/app-release.apk /mobile/release/client.apk