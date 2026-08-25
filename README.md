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

## 🚀 HƯỚNG DẪN CHẠY DỰ ÁN (CHẠY TRỰC TIẾP — 1 HƯỚNG DUY NHẤT)

> ⛔ **LƯU Ý:** Thư viện sử dụng mã nguồn C++ Native (Google ML Kit, Nitro Modules). **KHÔNG dùng app Expo Go** trên điện thoại để quét mã QR vì sẽ bị lỗi màn hình xanh không tương thích. Hãy chạy trực tiếp bằng lệnh dưới đây:

---

### 🪟 DÀNH CHO MÁY TÍNH WINDOWS (CHẠY ANDROID)

> **Chuẩn bị:** Cắm cáp USB điện thoại vào máy tính (bật **Gỡ lỗi USB / USB Debugging** trên điện thoại).

#### **Bước 1: Cài đặt và build thư viện (Chạy 1 lần duy nhất)**
Mở **PowerShell** hoặc **Command Prompt (CMD)** tại thư mục gốc của repository:
```sh
pnpm install
pnpm prepare
```

#### **Bước 2: Khởi động Metro Bundler Server (Mở cửa sổ Terminal / CMD 1)**
```sh
cd example
pnpm start --clear
```

#### **Bước 3: Biên dịch và nạp app lên điện thoại (Mở cửa sổ Terminal / CMD 2)**
```sh
cd example
pnpm run android
```
> 🎉 **Xong!** Lệnh `pnpm run android` (hoặc `npx expo run:android`) sẽ tự động kết nối ADB, nạp cầu nối cổng 8081, build APK và cài đặt thẳng vào điện thoại của bạn!

---

### 🍎 DÀNH CHO MÁY TÍNH MACOS (CHẠY IPHONE / IPAD HOẶC ANDROID)

#### **1. Chạy trên iPhone thật (Cắm cáp USB):**
```sh
pnpm install
pnpm prepare
cd example/ios && pod install && cd ..
pnpm run ios
```

#### **2. Chạy trên Android (Máy Mac):**
```sh
pnpm install
pnpm prepare
cd example
pnpm run android
```

---

### 💡 Dành cho người dùng `yarn` hoặc `npm`:
- Thay `pnpm start --clear` bằng `yarn start --clear` (hoặc `npm start -- --clear`)
- Thay `pnpm run android` bằng `yarn android` (hoặc `npm run android`)

---

## 🛠️ Cấu hình Expo (`app.json`)

Do thư viện sử dụng các module C++ Native (Nitro Modules), ứng dụng cần cấu hình quyền truy cập Camera trong `app.json`:

```json
{
  "expo": {
    "name": "Vision OCR Plus",
    "slug": "vision-ocr-plus",
    "plugins": [
      [
        "react-native-vision-camera",
        {
          "cameraPermissionText": "$(PRODUCT_NAME) cần quyền truy cập Camera để nhận diện và dịch văn bản trực tiếp."
        }
      ]
    ]
  }
}
```

---

## ☁️ Đóng gói cài đặt từ xa qua EAS Build (Không cần cáp)

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

### 4. Custom Hooks — Xây dựng Frame Processor riêng

Bạn có thể sử dụng `useTextRecognition` hoặc `useTranslate` để tích hợp vào Frame Processor tùy chỉnh:

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

---

## 📊 Bảng tổng hợp các lệnh CLI (`pnpm` / `yarn` / `npm`)

| Tác vụ | pnpm | yarn | npm |
|---|---|---|---|
| **Cài đặt toàn bộ** | `pnpm install` | `yarn install` | `npm install` |
| **Build thư viện** | `pnpm prepare` | `yarn prepare` | `npm run prepare` |
| **Kill Port 8081** | `npx kill-port 8081` | `npx kill-port 8081` | `npx kill-port 8081` |
| **Chạy Metro** | `cd example && pnpm start` | `cd example && yarn start` | `cd example && npm start` |
| **Chạy Android** | `cd example && pnpm run android` | `cd example && yarn android` | `cd example && npm run android` |
| **Chạy iOS** | `cd example && pnpm run ios --device` | `cd example && yarn ios --device` | `cd example && npm run ios --device` |

---

## 🧠 Đóng góp & Báo lỗi (Contributing)

Mọi đóng góp, báo cáo lỗi (issues) và pull request đều được hoan nghênh:
- Báo lỗi: [GitHub Issues](https://github.com/APPMKTVN/react-native-vision-camera-text-recognition/issues)
- Tạo yêu cầu: [GitHub Pull Requests](https://github.com/APPMKTVN/react-native-vision-camera-text-recognition/pulls)

---

## ☕ Support the Project

If this library helps you build awesome apps, consider supporting future maintenance and development 💛

- [💖 Sponsor on GitHub](https://github.com/sponsors/jamenamcinteer)

Your support helps keep the package updated and open source ❤️

---

## 📄 License

MIT © [Jamena McInteer](https://github.com/jamenamcinteer)
