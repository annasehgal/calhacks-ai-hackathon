# 🐾 Pet Finder – Pi Camera + Coral TPU + Flask Stream

Real-time object detection using a Raspberry Pi with a Pi Camera Module V2 and Coral USB Accelerator. Streams video over Flask. Training and model prep is done on a laptop, and inference runs on the Pi.

---

## 🔧 Raspberry Pi Setup (Bookworm 64-bit)

### 1. System packages

```bash
sudo apt update && sudo apt install -y \
python3-picamera2 v4l-utils libusb-1.0-0-dev libedgetpu1-std \
make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev \
libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev \
xz-utils tk-dev libffi-dev liblzma-dev git
```

### 2. Install pyenv

```bash
curl https://pyenv.run | bash
```

Then add to your ~/.bashrc:

```bash
export PATH="$HOME/.pyenv/bin:$PATH"
eval "$(pyenv init --path)"
eval "$(pyenv virtualenv-init -)"
```

Restart your shell:

```bash
exec "$SHELL"
```

---

### 3. Python 3.9 + virtualenv

```bash
pyenv install 3.9.18
python3.9 -m venv ~/coral-venv --system-site-packages
source ~/coral-venv/bin/activate
```

---

### 4. Install Python packages

```bash
pip install -r requirements.txt
pip install tflite-runtime==2.5.0.post1
pip install https://github.com/google-coral/pycoral/releases/download/v2.0.0/pycoral-2.0.0-cp39-cp39-linux_aarch64.whl
```

---

### 5. Run the stream

```bash
python stream.py
```

View at:  
`http://<your-pi-ip>:5000/video_feed`

---

## 💻 Laptop Setup (Training + Model Prep)

### 1. Python env for training

```bash
pyenv install 3.9.18
'''

#### Create a virtual environment using Python 3.9
```bash
python3.9 -m venv coral-train
source coral-train/bin/activate
```
#### Alternative (if you prefer pyenv-virtualenv)
```bash
pyenv virtualenv 3.9.18 coral-train
pyenv activate coral-train
'''

#### Install training dependencies
```bash
pip install tensorflow-macos==2.13.0 numpy pandas opencv-python
```

### 2. (After building/tuning your model): Convert + compile model

```bash
tflite_convert --output_file=model.tflite ...
edgetpu_compiler model.tflite
```

### 3. Copy model to Pi

```bash
scp model_edgetpu.tflite pi@<pi-ip>:~/models/
```

---

## 🧠 Notes

- Uses `picamera2` for fast streaming
- `libedgetpu1-std` is installed (not max)
- Tested on Raspberry Pi OS Bookworm 64-bit + Coral USB Accelerator