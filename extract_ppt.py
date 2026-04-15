import sys
from pptx import Presentation

def extract_text(file_path):
    try:
        prs = Presentation(file_path)
        for i, slide in enumerate(prs.slides):
            print(f"--- Slide {i+1} ---")
            for shape in slide.shapes:
                if hasattr(shape, "text"):
                    # force ascii or handle unicode safely
                    print(shape.text.encode('utf-8', 'ignore').decode('utf-8'))
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        # configure stdout to use utf-8
        sys.stdout.reconfigure(encoding='utf-8')
        extract_text(sys.argv[1])
