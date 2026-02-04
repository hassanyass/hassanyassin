
import os

def replace_links(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace broken paths
    new_content = content.replace('Projects/', 'projects/')
    new_content = new_content.replace('Main Page Pictures/', 'images/')
    new_content = new_content.replace('Community/', 'community/')
    new_content = new_content.replace('Hassan Yassin CV.pdf', 'hassan-yassin-cv.pdf')
    
    # Specific subfolder fixes (if they were uppercase in links)
    new_content = new_content.replace('projects/EcoVision/', 'projects/ecovision/')
    new_content = new_content.replace('projects/EatInSight/', 'projects/eatinsight/')
    new_content = new_content.replace('projects/Path2hire/', 'projects/pathtohire/')
    new_content = new_content.replace('projects/Deep Learning–Based Heart Attack Risk Prediction/', 'projects/heart-attack-prediction/')
    new_content = new_content.replace('projects/LearnBack - undergoing/', 'projects/learnback/')
    
    if content != new_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated: {file_path}")

# Walk through all HTML files
root_dir = r"c:\Users\hassa\Documents\HassanYassin\Port26"
for dirpath, dirnames, filenames in os.walk(root_dir):
    for filename in filenames:
        if filename.lower().endswith('.html'):
            replace_links(os.path.join(dirpath, filename))
