# react-native-vision-camera-ocr-plus

[![CI Status](https://github.com/jamenamcinteer/react-native-vision-camera-ocr-plus/actions/workflows/ci.yml/badge.svg)](https://github.com/jamenamcinteer/react-native-vision-camera-ocr-plus/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/react-native-vision-camera-ocr-plus.svg)](https://www.npmjs.com/package/react-native-vision-camera-ocr-plus)
[![Platform](https://img.shields.io/badge/platform-Android%20%7C%20iOS%20%7C%20visionOS-blue.svg)](https://github.com/jamenamcinteer/react-native-vision-camera-ocr-plus)

<table>
<tr style="border: 0;">
<td valign="top" style="border: 0;">

**On-device OCR and real-time text translation** for React Native & Expo, powered by [VisionCamera](https://github.com/mrousavy/react-native-vision-camera) and [Nitro Modules](https://github.com/mrousavy/nitro). Uses Google ML Kit under the hood for ultra-fast, 100% offline on-device text recognition and translation.

### 🌟 Key Features

- 📷 **Live OCR** — Recognize text continuously from camera frames with zero memory leaks.
- 🔤 **Live Translation** — Real-time on-device translation (e.g. Vietnamese ➔ English, English ➔ Vietnamese).
- 🖼️ **Photo OCR** — Asynchronous text extraction from static image URIs.
- 🎯 **Scan-Region Cropping** — Customizable crop box (e.g. `80% x 35%`) to focus recognition.
- 🌐 **100% On-Device & Offline** — Free forever, no Google Cloud API keys or recurring fees required.
- 🚀 **Cross-Platform** — Full native support for **Android** (SDK 26–36) and **iOS** (iPhone / iPad / visionOS).

</td>
<td valign="top" style="border: 0;">
  <img src="demo.gif" width="360" alt="Demo GIF" />
</td>
</tr>
</table>

---

## 📋 Requirements

| Requirement | Minimum Version | Notes |
|---|---|---|
| **Node.js** | `>= 18.0.0` | Recommended LTS |
| **Package Manager** | `pnpm` / `yarn` / `npm` | `pnpm` recommended |
| **React Native** | `>= 0.81.0` | New Architecture & Nitro ready |
| **Expo SDK** | `>= 54.0.0` | Requires Prebuild / Dev Client |
| **Android SDK** | `minSdkVersion 26`, `compileSdk 35+` | NDK `27.x` |
| **iOS / macOS** | `iOS >= 15.1` (or `16.0+` with Firebase) | Xcode `>= 15.0`, CocoaPods |

---

## 📦 Installation

```sh
# Using pnpm (Recommended)
pnpm add react-native-vision-camera-ocr-plus react-native-nitro-modules react-native-vision-camera-worklets react-native-worklets

# Using npm
npm install react-native-vision-camera-ocr-plus react-native-nitro-modules react-native-vision-camera-worklets react-native-worklets

# Using yarn
yarn add react-native-vision-camera-ocr-plus react-native-nitro-modules react-native-vision-camera-worklets react-native-worklets
```

### Peer Dependencies

```json
{
  "peerDependencies": {
    "react-native-vision-camera": ">=5.0.0",
    "react-native-nitro-modules": "*",
    "react-native-vision-camera-worklets": "*",
    "react-native-worklets": ">=0.8.0"
  }
}
```

---

## 📱 HƯỚNG DẪN CHẠY TRÊN ANDROID (Chi Tiết 100% Không Lỗi)

> 💡 **Lưu ý quan trọng**: Khi cắm cáp USB vào điện thoại thật, bạn bắt buộc phải chạy lệnh cầu nối `adb reverse tcp:8081 tcp:8081` để điện thoại kết nối được với Metro Server trên máy tính (tránh lỗi màn hình đỏ `Unable to load script`).

### Cách 1: Chạy bằng lệnh Expo CLI (`pnpm` / `npx`)

#### **Bước 1: Kết nối điện thoại và cầu nối cổng USB**
Cắm cáp USB (bật *Gỡ lỗi USB* và chọn *Truyền tệp*). Mở CMD chạy:
```cmd
"C:\Users\PC\AppData\Local\Android\Sdk\platform-tools\adb.exe" reverse tcp:8081 tcp:8081
```

#### **Bước 2: Khởi động Metro Server (Cửa sổ CMD 1)**
```cmd
cd example
pnpm start
# Hoặc: npx expo start --clear
```

#### **Bước 3: Biên dịch và chạy app (Cửa sổ CMD 2)**
```cmd
cd example
pnpm run android
# Hoặc: npx expo run:android
```

---

### Cách 2: Chạy trực tiếp bằng Gradle (`gradlew installDebug`)

Nếu bạn muốn nạp file APK thẳng vào máy nhanh nhất mà không qua Expo CLI:

```cmd
# Cửa sổ 1: Cầu nối USB & Bật Metro Server
"C:\Users\PC\AppData\Local\Android\Sdk\platform-tools\adb.exe" reverse tcp:8081 tcp:8081 & cd /d C:\cmr\repo-fresh\example & pnpm start

# Cửa sổ 2: Build & Cài đặt APK
cd /d C:\cmr\repo-fresh\example\android & gradlew.bat installDebug
```

---

## 🍏 HƯỚNG DẪN CHẠY TRÊN iOS (iPhone / iPad / macOS)

> ⚠️ **Yêu cầu môi trường iOS**: Cần sử dụng máy tính **macOS** có cài đặt **Xcode** (từ App Store) và **CocoaPods**.

### 1. Cài đặt Pods cho iOS
```sh
cd example
pnpm install

cd ios
pod install
cd ..
```

### 2. Chạy trên iPhone thật (Physical Device)
1. Cắm cáp kết nối iPhone với máy Mac (chọn *Tin cậy máy tính này*).
2. Chạy lệnh:
```sh
cd example
pnpm run ios --device
# Hoặc: npx expo run:ios --device
```

### 3. Chạy trên iOS Simulator (Máy ảo Mac)
```sh
cd example
pnpm ios
# Hoặc: npx expo run:ios
```

> ⚠️ **Lưu ý với chip Apple Silicon (M1/M2/M3/M4)**: Google ML Kit chạy mượt 100% trên thiết bị iPhone thật. Nếu chạy trên Simulator, hãy chạy Simulator dưới chế độ Rosetta.

---

## 🛠️ Cấu hình Expo (`app.json`)

Vì thư viện sử dụng mã nguồn Native C++ (Nitro Modules), ứng dụng **cần dùng Expo Prebuild / Dev Client** thay vì Expo Go tiêu chuẩn.

Thêm cấu hình quyền truy cập Camera vào `app.json`:

```json
{
  "expo": {
    "name": "Vision OCR Plus",
    "slug": "vision-ocr-plus",
    "plugins": [
      [
        "react-native-vision-camera",
        {
          "cameraPermissionText": "$(PRODUCT_NAME) cần quyền truy cập Camera để nhận diện và dịch văn bản."
        }
      ]
    ]
  }
}
```

---

## 🚀 Đóng gói cài đặt từ xa qua EAS Build (Không cần cáp)

Bạn có thể đóng gói file **APK** (Android) hoặc **IPA** (iOS) qua đám mây của Expo:

```sh
# 1. Đăng nhập Expo EAS
npm install -g eas-cli
eas login

# 2. Build APK Android cài trực tiếp:
eas build -p android --profile preview

# 3. Build IPA cho iOS:
eas build -p ios --profile preview
```

---

## 💻 Hướng dẫn Lập trình (Code Examples)

### 1. Quét và Dịch trực tiếp từ Camera (`mode="translate"`)

```tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useCameraDevice } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera-ocr-plus';

export default function App() {
  const device = useCameraDevice('back');
  const [translatedText, setTranslatedText] = React.useState('');

  if (!device) return <Text>No Camera Device</Text>;

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        mode="translate"
        options={{
          from: 'vi', // Ngôn ngữ nguồn (Ví dụ: Tiếng Việt)
          to: 'en',   // Ngôn ngữ đích (Ví dụ: Tiếng Anh)
          scanRegion: { left: '10%', top: '25%', width: '80%', height: '35%' },
        }}
        callback={(text) => {
          if (typeof text === 'string') {
            setTranslatedText(text);
          }
        }}
      />
      <View style={styles.resultBox}>
        <Text style={styles.resultText}>{translatedText || 'Đang quét...'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  resultBox: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 16,
    borderRadius: 12,
  },
  resultText: { color: '#fff', fontSize: 16, textAlign: 'center' },
});
```

### 2. Quét văn bản gốc (`mode="recognize"`)

```tsx
<Camera
  style={StyleSheet.absoluteFill}
  device={device}
  isActive={true}
  mode="recognize"
  options={{
    language: 'latin', // 'latin' | 'chinese' | 'japanese' | 'korean'
    frameSkipThreshold: 10,
  }}
  callback={(data: any) => {
    console.log('Detected text:', data.resultText);
    console.log('Text blocks:', data.blocks);
  }}
/>
```

### 3. Nhận diện văn bản từ ảnh tĩnh (`PhotoRecognizer`)

```tsx
import { PhotoRecognizer } from 'react-native-vision-camera-ocr-plus';

const result = await PhotoRecognizer({
  uri: 'file:///path/to/image.jpg',
  orientation: 'portrait',
});
console.log('Image Text:', result.resultText);
```

---

## 📊 Bảng tổng hợp các lệnh thông dụng (`pnpm`)

| Lệnh | Mục đích |
|---|---|
| `pnpm install` | Cài đặt dependencies toàn bộ dự án |
| `cd example && pnpm start` | Khởi động Metro Bundler Server |
  return (
    <Camera
      style={{ flex: 1 }}
      device={device}
      isActive
      mode="translate"
      options={{ from: 'fr', to: 'en' }}
      callback={(data) => console.log(data as string)}
    />
  )
}
```

### Hooks — build your own frame processor

Use `useTextRecognition` or `useTranslate` to integrate the plugins into a custom frame processor.

#### `useTextRecognition`

Returns a `TextRecognitionHandle` with a worklet-safe `scanText` function and the raw `recognizer` HybridObject.

In VisionCamera v5, `pixelFormat` is configured via `useFrameOutput` (not a `<Camera>` prop). **Android requires `pixelFormat: 'rgb'`** so the AHardwareBuffer is in RGBA format and can be CPU-locked; on iOS any format works.

```tsx
import { useTextRecognition, type Text } from 'react-native-vision-camera-ocr-plus'
import { Camera, useFrameOutput, useCameraDevice } from 'react-native-vision-camera'
import { scheduleOnRN } from 'react-native-worklets'

function MyCamera() {
  const device = useCameraDevice('back')
  const { scanText } = useTextRecognition({ language: 'latin', frameSkipThreshold: 5 })

  const frameOutput = useFrameOutput({
    pixelFormat: 'rgb', // required on Android
    onFrame: (frame) => {
      'worklet'
      const result = scanText(frame)
      if (result.resultText) {
        scheduleOnRN(setDetectedText, result.resultText)
      }
      frame.dispose()
    },
  })

  return <Camera device={device} isActive outputs={[frameOutput]} />
}

> **Tip — Scan region:** Pass `scanRegion` in the options to restrict OCR to a portion of the frame.
> The coordinates are percentage strings (`"0%"` – `"100%"`) relative to the display-oriented frame.
> Pair it with a matching `<View>` overlay so the visible box aligns with what is actually scanned:
>
> ```tsx
> const scanRegion = { left: '10%', top: '25%', width: '80%', height: '30%' }
> const { scanText } = useTextRecognition({ language: 'latin', scanRegion })
>
> // Render a matching overlay:
> <View style={{ position: 'absolute', left: '10%', top: '25%', width: '80%', height: '30%',
>                borderWidth: 2, borderColor: 'red' }} />
> ```

#### `useTranslate`

Returns a `TranslatorHandle` with a worklet-safe `scanText` function for OCR and an async `translate` function for translation.

```tsx
import { useTranslate } from 'react-native-vision-camera-ocr-plus'
import { Camera, useFrameOutput, useCameraDevice } from 'react-native-vision-camera'
import { scheduleOnRN } from 'react-native-worklets'

function MyCamera() {
  const device = useCameraDevice('back')
  const { scanText, translate } = useTranslate({ from: 'fr', to: 'en' })
  // To restrict OCR to a region, pass scanRegion:
  // const { scanText, translate } = useTranslate({ from: 'fr', to: 'en', scanRegion: { left: '10%', top: '25%', width: '80%', height: '30%' } })

  const frameOutput = useFrameOutput({
    pixelFormat: 'rgb', // required on Android
    onFrame: (frame) => {
      'worklet'
      const result = scanText(frame)
      if (result.resultText) {
        translate(result.resultText).then((translated) => {
          scheduleOnRN(setTranslated, translated)
        })
      }
      frame.dispose()
    },
  })

  return <Camera device={device} isActive outputs={[frameOutput]} />
}
```

#### Low-level factories

The hooks call `createTextRecognitionPlugin` and `createTranslatorPlugin` internally. You can use them directly outside of React components:

```ts
import { createTextRecognitionPlugin } from 'react-native-vision-camera-ocr-plus'

const { scanText, recognizer } = createTextRecognitionPlugin({ language: 'latin' })
```

### `PhotoRecognizer` — still image OCR

Asynchronously recognizes text in a still photo URI.

```tsx
import { PhotoRecognizer, type Text } from 'react-native-vision-camera-ocr-plus'

const result: Text = await PhotoRecognizer({
  uri: 'file:///path/to/photo.jpg',
  orientation: 'portrait', // 'portrait' | 'portraitUpsideDown' | 'landscapeLeft' | 'landscapeRight'
})

console.log(result.resultText)
console.log(result.blocks) // TextBlock[]
```

The `orientation` parameter is optional and defaults to `'portrait'`. On iOS the `file://` scheme is stripped automatically; on Android it is added if missing.

### `RemoveLanguageModel` — free storage

Removes a downloaded ML Kit translation model from the device. Returns `true` on success.

```tsx
import { RemoveLanguageModel } from 'react-native-vision-camera-ocr-plus'

const success: boolean = await RemoveLanguageModel('fr')
```

---

## API Reference

### `<Camera />`

Accepts all standard VisionCamera `CameraProps` plus:

| Prop | Type | Description |
|---|---|---|
| `mode` | `'recognize' \| 'translate'` | Whether to run OCR or OCR + translation |
| `options` | `TextRecognitionOptions \| TranslatorOptions` | Mode-specific options (see below) |
| `callback` | `(data: Text \| string) => void` | Called with `Text` in recognize mode or a translated `string` in translate mode |

### Functions

| Function | Signature | Description |
|---|---|---|
| `PhotoRecognizer` | `(options: PhotoOptions) => Promise<Text>` | OCR a still image by URI |
| `RemoveLanguageModel` | `(code: Languages) => Promise<boolean>` | Delete a downloaded translation model |
| `createTextRecognitionPlugin` | `(options?: TextRecognitionOptions) => TextRecognitionHandle` | Create a frame-processor OCR plugin |
| `createTranslatorPlugin` | `(options?: TranslatorOptions) => TranslatorHandle` | Create a frame-processor translation plugin |

### Hooks

| Hook | Returns | Description |
|---|---|---|
| `useTextRecognition(options?)` | `TextRecognitionHandle` | Memoized OCR plugin |
| `useTranslate(options?)` | `TranslatorHandle` | Memoized translation plugin |

### Types

```ts
type Text = {
  resultText: string
  blocks: BlockData[]
}

type BlockData = {
  blockText: string
  blockFrame: FrameType
  blockCornerPoints?: CornerPointsType
  lines: LineData[]
}

type LineData = {
  lineText: string
  lineFrame: FrameType
  lineCornerPoints?: CornerPointsType
  lineLanguages?: string[]
  elements: ElementData[]
}

type ElementData = {
  elementText: string
  elementFrame: FrameType
  elementCornerPoints?: CornerPointsType
}

type FrameType = {
  boundingCenterX: number
  boundingCenterY: number
  height: number
  width: number
  x: number
  y: number
}

type CornerPointsType = { x: number; y: number }[]

type ScanRegion = {
  left: Percentage   // e.g. "10%"
  top: Percentage
  width: Percentage
  height: Percentage
}

type TextRecognitionOptions = {
  language?: 'latin' | 'chinese' | 'devanagari' | 'japanese' | 'korean'
  scanRegion?: ScanRegion
  frameSkipThreshold?: number   // default: 10
  useLightweightMode?: boolean  // Android only — skips corner points, languages, and element data; default: false
}

type TranslatorOptions = {
  from: Languages
  to: Languages
  scanRegion?: ScanRegion  // restrict OCR to a percentage-based region of the frame
}

type PhotoOptions = {
  uri: string
  orientation?: 'portrait' | 'portraitUpsideDown' | 'landscapeLeft' | 'landscapeRight'
}

type TextRecognitionHandle = {
  scanText: (frame: Frame) => Text  // worklet-safe
  recognizer: TextRecognizer        // raw Nitro HybridObject
}

type TranslatorHandle = {
  scanText: (frame: Frame) => Text        // worklet-safe OCR
  translate: (text: string) => Promise<string>  // JS-thread translation
  recognizer: TextRecognizer
  translator: Translator
  from: string
  to: string
}
```

`Languages` is a union of BCP-47 language codes: `'af' | 'sq' | 'ar' | 'be' | 'bn' | 'bg' | 'ca' | 'zh' | 'cs' | 'da' | 'nl' | 'en' | ...` (full list in [src/types.ts](src/types.ts)).

---

## Structure

```
android/           Kotlin HybridObject implementations (HybridTextRecognizer, HybridTranslator)
ios/               Swift HybridObject implementations
src/
  specs/
    TextRecognizer.nitro.ts   Nitro HybridObject spec for OCR
    Translator.nitro.ts       Nitro HybridObject spec for translation
  Camera.tsx                  <Camera> component + useTextRecognition / useTranslate hooks
  scanText.ts                 createTextRecognitionPlugin (frame processor factory)
  translateText.ts            createTranslatorPlugin (frame processor factory)
  PhotoRecognizer.ts          Async still-photo OCR
  RemoveLanguageModel.ts      Delete downloaded translation models
  types.ts                    All shared TypeScript types
  index.ts                    Public API surface
nitro.json         Nitrogen config — registers HybridTextRecognizer & HybridTranslator
```

## 🧠 Contributing

Contributions, feature requests, and bug reports are always welcome!  
Please open an [issue](https://github.com/jamenamcinteer/react-native-vision-camera-ocr-plus/issues) or [pull request](https://github.com/jamenamcinteer/react-native-vision-camera-ocr-plus/pulls).

---

## ☕ Support the Project

If this library helps you build awesome apps, consider supporting future maintenance and development 💛

- [💖 Sponsor on GitHub](https://github.com/sponsors/jamenamcinteer)

Your support helps keep the package updated and open source ❤️

---

## 📄 License

MIT © [Jamena McInteer](https://github.com/jamenamcinteer)
