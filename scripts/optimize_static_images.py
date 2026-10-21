#!/usr/bin/env python3
"""Build deployment-ready WebP sizes from preserved original portfolio assets.

Requires ffmpeg with libwebp. Source files remain in ../source-assets/uploads.
640px candidates use the highest encoder quality that fits the 30 KB budget;
1600px candidates preserve detail for hero and full-width imagery.
"""
from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "source-assets" / "uploads"
OUTPUT = ROOT / "static-site" / "uploads"
FORMATS = {".avif", ".webp", ".jpg", ".jpeg", ".png"}
BUDGET = 30_000


def encode(source: Path, width: int, quality: int, output: Path) -> None:
    args = ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(source),
            "-vf", f"scale='min({width},iw)':-2", "-c:v", "libwebp",
            "-quality", str(quality), "-compression_level", "6", "-preset", "photo", str(output)]
    subprocess.run(args, check=True)


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    originals = sorted(p for p in SOURCE.iterdir() if p.suffix.lower() in FORMATS and p.name != "profile.jpg")
    for source in originals:
        small = OUTPUT / f"{source.stem}-640.webp"
        for quality in range(76, 49, -2):
            encode(source, 640, quality, small)
            if small.stat().st_size <= BUDGET:
                break
        large = OUTPUT / f"{source.stem}-1600.webp"
        encode(source, 1600, 80, large)
        print(f"{source.name}: {small.stat().st_size:,} B (q≤76), {large.stat().st_size:,} B")
    profile = SOURCE / "profile.jpg"
    if profile.exists():
        small_profile = OUTPUT / "profile-400.webp"
        encode(profile, 400, 80, small_profile)
        print(f"profile.jpg: {small_profile.stat().st_size:,} B (400px)")


if __name__ == "__main__":
    main()
