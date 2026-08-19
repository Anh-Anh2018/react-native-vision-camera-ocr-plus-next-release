import * as React from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {
  Camera,
  PhotoRecognizer,
  useTranslate,
} from 'react-native-vision-camera-ocr-plus';
import type {
  Languages,
  ScanRegion,
} from 'react-native-vision-camera-ocr-plus';
import * as ImagePicker from 'expo-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const scanRegion = {
  left: '10%',
  top: '25%',
  width: '80%',
  height: '35%',
} as ScanRegion;

type LanguageOption = { label: string; value: Languages };

const LANGUAGES: LanguageOption[] = [
  { label: 'Vietnamese (Tiếng Việt)', value: 'vi' },
  { label: 'English', value: 'en' },
  { label: 'Spanish', value: 'es' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Italian', value: 'it' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Chinese', value: 'zh' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Arabic', value: 'ar' },
  { label: 'Hindi', value: 'hi' },
  { label: 'Dutch', value: 'nl' },
  { label: 'Polish', value: 'pl' },
  { label: 'Turkish', value: 'tr' },
];

export default function App() {
  const insets = useSafeAreaInsets();
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const [detectedText, setDetectedText] = React.useState<string>();
  const [image, setImage] = React.useState<string | null>(null);
  const [imageText, setImageText] = React.useState<string>('');
  const [appMode, setAppMode] = React.useState<'recognize' | 'translate'>('translate');
  const [sourceLanguage, setSourceLanguage] = React.useState<Languages>('vi');
  const [targetLanguage, setTargetLanguage] = React.useState<Languages>('en');
  const [useCropRegion, setUseCropRegion] = React.useState<boolean>(false);
  const [langPickerMode, setLangPickerMode] = React.useState<'source' | 'target' | null>(null);
  const [isTranslating, setIsTranslating] = React.useState<boolean>(false);

  const selectedSourceLabel =
    LANGUAGES.find((l) => l.value === sourceLanguage)?.label ?? sourceLanguage;
  const selectedTargetLabel =
    LANGUAGES.find((l) => l.value === targetLanguage)?.label ?? targetLanguage;

  const { translate } = useTranslate({ from: sourceLanguage, to: targetLanguage });

  React.useEffect(() => {
    if (!hasPermission) requestPermission();
  }, [hasPermission, requestPermission]);

  React.useEffect(() => {
    const readImage = async () => {
      setImageText('');
      try {
        const ocrResult = await PhotoRecognizer({
          uri: image || '',
          orientation: 'portrait',
        });
        const rawText = ocrResult.resultText || '';
        if (rawText) {
          setIsTranslating(true);
          const translated = await translate(rawText);
          setImageText(translated || rawText);
        }
      } catch (error) {
        Alert.alert('Error reading image', (error as Error).message);
      } finally {
        setIsTranslating(false);
      }
    };

    if (image) {
      readImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, targetLanguage, sourceLanguage]);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        'Permission required',
        'Permission to access the media library is required.'
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      setImage(result.assets[0]!.uri);
    }
  };

  if (!device || !hasPermission) {
    return (
      <View style={styles.center}>
        <Text>
          {!device ? 'No camera device' : 'Requesting camera permission…'}
        </Text>
      </View>
    );
  }

  const cameraOptions = React.useMemo(
    () => ({
      language: 'latin',
      from: sourceLanguage,
      to: targetLanguage,
      ...(useCropRegion ? { scanRegion } : {}),
    }),
    [sourceLanguage, targetLanguage, useCropRegion]
  );

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive
        mode={appMode}
        options={cameraOptions as any}
        callback={(data: any) => {
          if (typeof data === 'string') {
            setDetectedText(data);
          } else if (data && typeof data === 'object' && 'resultText' in data) {
            setDetectedText(data.resultText);
          }
        }}
      />
      {useCropRegion && <View style={styles.scanRegion} />}

      {/* Control Buttons Bar */}
      <View style={styles.topControlBar}>
        <Pressable
          style={[styles.controlBtn, appMode === 'translate' && styles.controlBtnActiveMode]}
          onPress={() => setAppMode(appMode === 'translate' ? 'recognize' : 'translate')}
        >
          <Text style={styles.buttonText}>
            {appMode === 'translate' ? '🔤 Translate' : '📷 Live OCR'}
          </Text>
        </Pressable>

        <Pressable
          style={styles.controlBtn}
          onPress={() => setLangPickerMode('source')}
        >
          <Text style={styles.buttonText}>From: {selectedSourceLabel}</Text>
        </Pressable>

        <Pressable
          style={styles.controlBtn}
          onPress={() => setLangPickerMode('target')}
        >
          <Text style={styles.buttonText}>To: {selectedTargetLabel}</Text>
        </Pressable>

        <Pressable
          style={[styles.controlBtn, useCropRegion && styles.controlBtnActive]}
          onPress={() => setUseCropRegion(!useCropRegion)}
        >
          <Text style={styles.buttonText}>
            {useCropRegion ? '🎯 Crop' : '🔍 Full'}
          </Text>
        </Pressable>
      </View>

      {/* Photo recognizer button */}
      <Pressable style={styles.rightButton} onPress={pickImage}>
        <Text style={styles.buttonText}>📷 Photo OCR</Text>
      </Pressable>

      <View style={styles.overlay}>
        <Text style={styles.title}>
          Detected ({selectedSourceLabel} ➔ {selectedTargetLabel}):
        </Text>
        <Text style={styles.line}>{detectedText || 'Scanning text...'}</Text>
      </View>

      {/* Language selection modal */}
      <Modal
        visible={langPickerMode !== null}
        animationType="slide"
        transparent
        onRequestClose={() => setLangPickerMode(null)}
      >
        <Pressable
          style={styles.langModalBackdrop}
          onPress={() => setLangPickerMode(null)}
        >
          <View
            style={[
              styles.langModalSheet,
              { paddingBottom: insets.bottom + 8 },
            ]}
          >
            <Text style={styles.langModalTitle}>
              Select {langPickerMode === 'source' ? 'Source' : 'Target'} Language
            </Text>
            <FlatList
              data={LANGUAGES}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => {
                const currentLang =
                  langPickerMode === 'source' ? sourceLanguage : targetLanguage;
                const isSelected = item.value === currentLang;
                return (
                  <Pressable
                    style={[
                      styles.langOption,
                      isSelected && styles.langOptionSelected,
                    ]}
                    onPress={() => {
                      if (langPickerMode === 'source') {
                        setSourceLanguage(item.value);
                      } else {
                        setTargetLanguage(item.value);
                      }
                      setDetectedText('Translating...');
                      setLangPickerMode(null);
                    }}
                  >
                    <Text
                      style={[
                        styles.langOptionText,
                        isSelected && styles.langOptionTextSelected,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                );
              }}
            />
          </View>
        </Pressable>
      </Modal>

      {/* Photo recognizer result modal */}
      <Modal visible={!!image} animationType="slide">
        <View style={styles.modalContainer}>
          {image && (
            <Image
              source={{ uri: image }}
              style={styles.image}
              resizeMode="contain"
            />
          )}
          <View style={styles.overlay}>
            <Text style={styles.title}>
              Translated text from image (→ {selectedTargetLabel}):
            </Text>
            <Text style={styles.line}>{imageText}</Text>
          </View>
          <Pressable style={styles.rightButton} onPress={() => setImage(null)}>
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scanRegion: {
    ...scanRegion,
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#FF3B30',
    borderRadius: 12,
  },
  overlay: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 56,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 12,
    borderRadius: 12,
  },
  title: { color: 'white', fontWeight: '600', marginBottom: 8 },
  line: { color: 'white' },
  modalContainer: { backgroundColor: 'black', flex: 1 },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  rightButton: {
    position: 'absolute',
    bottom: 120,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },
  topControlBar: {
    position: 'absolute',
    top: 50,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  controlBtn: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 16,
    alignItems: 'center',
  },
  controlBtnActive: {
    backgroundColor: 'rgba(255, 59, 48, 0.8)',
  },
  controlBtnActiveMode: {
    backgroundColor: 'rgba(0, 122, 255, 0.8)',
  },
  leftButton: {
    position: 'absolute',
    top: 56,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buttonText: { color: 'white', fontSize: 14, fontWeight: '500' },
  langModalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  langModalSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: Dimensions.get('window').height * 0.6,
  },
  langModalTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  langOption: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  langOptionSelected: { backgroundColor: '#007AFF20' },
  langOptionText: { fontSize: 15, color: '#333' },
  langOptionTextSelected: { color: '#007AFF', fontWeight: '600' },
});
