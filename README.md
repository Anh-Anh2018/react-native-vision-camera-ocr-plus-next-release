# react-native-vision-camera-ocr-plus

[![CI Status](https://github.com/jamenamcinteer/react-native-vision-camera-ocr-plus/actions/workflows/ci.yml/badge.svg)](https://github.com/jamenamcinteer/react-native-vision-camera-ocr-plus/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/react-native-vision-camera-ocr-plus.svg)](https://www.npmjs.com/package/react-native-vision-camera-ocr-plus)

<table>
<tr style="border: 0;">
<td valign="top" style="border: 0;">

On-device OCR and text translation for React Native, powered by [VisionCamera](https://github.com/mrousavy/react-native-vision-camera) and [Nitro Modules](https://github.com/mrousavy/nitro). Uses Google ML Kit under the hood for both text recognition and on-device translation.

### Features

- **Live OCR** — read text from every camera frame via a VisionCamera frame processor
- **Live translation** — recognize and translate camera frame text in real time
- **Photo OCR** — recognize text asynchronously from a still image URI
- **Model management** — remove downloaded translation language models to free storage
- Supports Latin, Chinese, Devanagari, Japanese, and Korean scripts
- Optional scan-region cropping to focus recognition on a sub-area of the frame
- Configurable frame skipping for performance tuning

</td>
<td valign="top" style="border: 0;">
  <img src="demo.gif" width="360" />
</td>
</tr>
</table>

## Requirements

| Requirement | Minimum version |
|---|---|
| React Native | 0.81 |
| iOS | 15.1 |
| Android Minimum SDK | 26 |
| Android Target SDK | 36 |
| react-native-vision-camera | 5.0.0 |
| react-native-worklets | 0.8.x |
| Expo (if used) | 54 |

## Migration from v1.x

Upgrading from v1? See the **[Migration Guide](MIGRATION.md)** for a full list of breaking changes and step-by-step instructions.

## Installation

```sh
npm install react-native-vision-camera-ocr-plus react-native-nitro-modules react-native-vision-camera-worklets react-native-worklets
```

### Peer dependencies

| Package | Version |
|---|---|
| `react-native-vision-camera` | `>=5.0.0` |
| `react-native-nitro-modules` | `*` |
| `react-native-vision-camera-worklets` | `*` |
| `react-native-worklets` | `>=0.8.0` |

### 🔥 Firebase Compatibility
If you have Firebase in your project, you will need to set your iOS Deployment Target to at least 16.0.

### ⚠️ iOS Simulator (Apple Silicon) – Heads-up

On Apple Silicon Macs, building for the **iOS Simulator (arm64)** may fail after installing this package.

This is a **known limitation of Google ML Kit**, which does not currently ship an `arm64-simulator` slice for some iOS frameworks.  
The library works correctly on **physical iOS devices** and on the **iOS Simulator when running under Rosetta**.

👉 [Full context and discussion](https://github.com/jamenamcinteer/react-native-vision-camera-ocr-plus/issues/91#issuecomment-3768407842)

### iOS

```sh
cd ios && pod install
```

### Android

No additional steps — the library is auto-linked.

---

## 📱 Expo Integration & Usage Guide

> [!IMPORTANT]
> **Expo Go không hỗ trợ Native C++ Modules**: Do thư viện sử dụng Nitro Modules và Google ML Kit (Native C++ / Swift / Kotlin), bạn **bắt buộc phải sử dụng Expo Prebuild / Expo Dev Client** (`npx expo run:android` hoặc `npx expo run:ios`) thay vì ứng dụng Expo Go tiêu chuẩn.

### 1. Cấu hình quyền Camera trong `app.json`

Thêm plugin `react-native-vision-camera` vào file `app.json` của bạn:

```json
{
  "expo": {
    "name": "My OCR App",
    "slug": "my-ocr-app",
    "plugins": [
      [
        "react-native-vision-camera",
        {
          "cameraPermissionText": "$(PRODUCT_NAME) cần quyền truy cập Camera để quét và nhận diện văn bản."
        }
      ]
    ]
  }
}
```

### 2. Khởi tạo mã nguồn Native (`Expo Prebuild`)

```sh
# Tự động tạo thư mục android/ và ios/ với đầy đủ cấu hình Native
npx expo prebuild
```

### 3. Chạy ứng dụng bằng Expo CLI

```sh
# Chạy trên Android (cắm cáp hoặc máy ảo)
npx expo run:android

# Chạy trên iOS (iPhone hoặc Simulator - yêu cầu macOS)
npx expo run:ios

# Khởi động Metro Bundler với Dev Client
npx expo start --dev-client --clear
```

### 4. Đóng gói file cài đặt (APK / IPA) qua EAS Build

```sh
# Cài đặt EAS CLI (nếu chưa có)
npm install -g eas-cli
eas login

# Khởi tạo cấu hình EAS Build
eas build:configure

# Build file APK Android độc lập (cài trực tiếp không cần máy tính)
eas build -p android --profile preview

# Build file IPA cho iOS
eas build -p ios --profile preview
```

---

## 🚀 Development & Run Commands (`pnpm`)

### 1. Cài đặt Dependencies

```sh
# Cài đặt dependencies tại thư mục gốc
pnpm install

# Cài đặt dependencies trong thư mục example
cd example
pnpm install
```

### 2. Hướng dẫn chạy chuẩn 3 bước trên Android (100% Không Lỗi)

> 💡 **Tại sao chạy bị lỗi màn hình đỏ `Unable to load script`?**  
> Khi chạy trên điện thoại thật cắm cáp USB, điện thoại cần được kết nối cổng với máy tính bằng lệnh `adb reverse tcp:8081 tcp:8081`. Nếu quên lệnh này, điện thoại sẽ không tải được code JavaScript từ máy tính.

#### **Bước 1: Cắm cáp USB & Kiểm tra nhận diện điện thoại**
Cắm cáp USB nối điện thoại với máy tính (chọn chế độ *Truyền tệp*, bật *Gỡ lỗi USB*). Mở **CMD** kiểm tra:
```sh
"C:\Users\PC\AppData\Local\Android\Sdk\platform-tools\adb.exe" devices
# Hoặc trên macOS/Linux: adb devices
```
*(Thấy hiện mã thiết bị kèm chữ `device` là đã kết nối thành công).*

#### **Bước 2: Cầu nối cổng USB & Khởi động Metro Server (Cửa sổ Terminal 1)**
Mở cửa sổ **CMD thứ nhất** và chạy lệnh:
```sh
"C:\Users\PC\AppData\Local\Android\Sdk\platform-tools\adb.exe" reverse tcp:8081 tcp:8081 && cd /d C:\cmr\repo-fresh\example && pnpm start
```
*(Giữ nguyên cửa sổ này để Metro Server nạp mã nguồn JavaScript).*

#### **Bước 3: Biên dịch và cài đặt trực tiếp file APK lên điện thoại (Cửa sổ Terminal 2)**
Mở thêm **cửa sổ CMD thứ hai** và chạy lệnh:
```sh
cd /d C:\cmr\repo-fresh\example\android && gradlew.bat installDebug
# Trên macOS/Linux: cd example/android && ./gradlew installDebug
```
*(Ứng dụng sẽ tự động nạp thành công 100% lên màn hình điện thoại mà không còn bất kỳ lỗi nào).*

### 3. Chạy ứng dụng trên iOS (iPhone / Simulator)

```sh
# Bước 1: Cài đặt CocoaPods
cd example/ios
pod install
cd ..

# Bước 2: Chạy ứng dụng trên iPhone
pnpm ios
# hoặc chạy trực tiếp trên thiết bị cắm dây:
pnpm run ios --device
```

### 4. Bảng tổng hợp các lệnh (`pnpm`)

| Lệnh `pnpm` | Mô tả tác vụ |
|---|---|
| `cd example && pnpm start` | Khởi động Metro Bundler Server |
| `cd example && pnpm android` | Build & nạp ứng dụng lên Android |
| `cd example && pnpm ios` | Build & nạp ứng dụng lên iOS (iPhone) |
| `pnpm lint` | Kiểm tra code formatting & linter |
| `pnpm typecheck` | Kiểm tra kiểu dữ liệu TypeScript |

---

## Usage

👉 See the [example app](https://github.com/jamenamcinteer/react-native-vision-camera-ocr-plus/tree/main/example) for a working demo.

### `<Camera />` — live OCR

A drop-in replacement for VisionCamera's `<Camera>` that automatically runs OCR on every frame and fires `callback` with the recognized text.

```tsx
import { Camera, type Text } from 'react-native-vision-camera-ocr-plus'
import { useCameraDevice } from 'react-native-vision-camera'

export default function App() {
  const device = useCameraDevice('back')

  return (
    <Camera
      style={{ flex: 1 }}
      device={device}
      isActive
      mode="recognize"
      options={{
        language: 'latin',         // 'latin' | 'chinese' | 'devanagari' | 'japanese' | 'korean'
        frameSkipThreshold: 10,    // process every Nth frame (default: 10)
        useLightweightMode: false, // Android only — skip corner points, languages, element data
        // scanRegion: { left: '10%', top: '20%', width: '80%', height: '30%' },
      }}
      callback={(data) => {
        const text = data as Text
        console.log(text.resultText)
        console.log(text.blocks) // TextBlock[]
      }}
    />
  )
}
```

### `<Camera />` — live translation

Recognizes and translates text from every camera frame. The `callback` receives the translated string.

```tsx
import { Camera } from 'react-native-vision-camera-ocr-plus'
import { useCameraDevice } from 'react-native-vision-camera'

export default function App() {
  const device = useCameraDevice('back')

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
