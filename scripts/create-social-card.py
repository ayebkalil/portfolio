from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


WIDTH, HEIGHT = 1200, 630
ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "src" / "public" / "social-card.png"
FONT_DIR = Path("C:/Windows/Fonts")


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT_DIR / name), size)


image = Image.new("RGB", (WIDTH, HEIGHT))
pixels = image.load()
for y in range(HEIGHT):
    for x in range(WIDTH):
        pixels[x, y] = (
            11 + x * 9 // WIDTH,
            19 + y * 14 // HEIGHT,
            36 + x * 22 // WIDTH,
        )

draw = ImageDraw.Draw(image)
draw.rounded_rectangle((72, 72, 1128, 558), radius=30, outline=(56, 82, 107), width=2)
draw.rounded_rectangle((112, 112, 294, 122), radius=5, fill=(73, 211, 188))
draw.text((112, 172), "Khalil Ayeb", font=font("segoeuib.ttf", 76), fill=(244, 248, 251))
draw.text((112, 280), "AI / ML Engineering", font=font("segoeuib.ttf", 54), fill=(73, 211, 188))
draw.text(
    (112, 386),
    "RAG  •  Computer Vision  •  Multimodal Learning",
    font=font("segoeui.ttf", 31),
    fill=(208, 222, 231),
)
draw.text(
    (112, 493),
    "ayebkalil.github.io/portfolio",
    font=font("segoeui.ttf", 25),
    fill=(158, 183, 201),
)

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
image.save(OUTPUT, optimize=True)
print(OUTPUT)
