from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import json
from collections import Counter

root = Path(__file__).resolve().parents[1]
dataset=json.loads((root/'dist/data/cases.json').read_text(encoding='utf-8'))
im = Image.new('RGB', (1200, 630), '#f6f5f0')
d = ImageDraw.Draw(im)
fontdir = Path('C:/Windows/Fonts')
def font(name, size):
    return ImageFont.truetype(str(fontdir / name), size)
ink, muted, coral = '#172c37', '#52646c', '#d94c35'
d.text((58, 40), 'AI BEHIND THE HEADLINES', font=font('arialbd.ttf', 18), fill=ink)
d.line((58, 82, 1142, 82), fill='#d9dfdb', width=1)
d.text((58, 127), 'Use AI.', font=font('georgia.ttf', 72), fill=ink)
d.text((58, 210), 'Think it through.', font=font('georgiai.ttf', 53), fill=coral)
d.text((61, 315), 'Eight everyday tasks. Three questions.', font=font('arial.ttf', 23), fill=muted)
d.text((61, 349), 'Explore ethics through your choices.', font=font('arial.ttf', 23), fill=muted)
d.rounded_rectangle((58, 429, 340, 478), radius=1, fill=ink)
d.text((79, 444), f"{len(dataset['cases'])} sourced case records", font=font('arialbd.ttf', 19), fill='#f6f5f0')
d.text((58, 552), 'Counts describe this collection, not worldwide prevalence.', font=font('arial.ttf', 17), fill=muted)
d.rectangle((780, 110, 1142, 514), fill='#142e3c')
d.text((806, 128), 'CASES IN THIS COLLECTION', font=font('arialbd.ttf', 11), fill='#d4e8da')
colors=['#89b5a1','#d79a67','#dd7862','#88a6cc','#a99cbe','#b8c88d','#d4a380','#90bdc5']
counts=Counter(c['category'] for c in dataset['cases'])
labels=[('PRIVACY & DATA','Privacy & data'),('DISCRIMINATION','Discrimination'),('FRAUD & IMPERSONATION','Fraud & impersonation'),('OUTPUT & CONTENT HARMS','Output & content harms'),('PHYSICAL SAFETY','Physical safety'),('MISLEADING AI CLAIMS','Misleading AI claims'),('GOVERNANCE & OVERSIGHT','Governance & oversight'),('CREATIVE CREDIT & AUTHORSHIP','Creative credit & authorship')]
for i, (color, (label,category)) in enumerate(zip(colors, labels)):
    y=157+i*38
    d.text((806,y),label,font=font('arial.ttf',10),fill='#bfd0cb')
    d.text((1080,y-7),str(counts[category]),font=font('georgia.ttf',23),fill=color)
    d.rectangle((806,y+21,1108,y+27),fill='#34515b')
    d.rectangle((806,y+21,806+int(302*counts[category]/max(counts.values())),y+27),fill=color)
d.text((806, 478), 'Includes allegations and changed outcomes.', font=font('arial.ttf', 10), fill='#d4e8da')
im.save(root/'dist/social-preview.png', optimize=True)
out=root.parents[1]/'outputs'
im.save(out/'ai-headlines-linkedin-cover.png', optimize=True)
print('Created 1200 x 630 sharing preview and LinkedIn cover.')
