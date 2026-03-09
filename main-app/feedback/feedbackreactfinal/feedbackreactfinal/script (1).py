
# Read the original CSS files to copy them
with open('feedback.css', 'r', encoding='utf-8') as f:
    feedback_css_full = f.read()

with open('sections.css', 'r', encoding='utf-8') as f:
    sections_css_full = f.read()

# Save them to files that can be downloaded
with open('react_feedback.css', 'w', encoding='utf-8') as f:
    f.write(feedback_css_full)

with open('react_sections.css', 'w', encoding='utf-8') as f:
    f.write(sections_css_full)

print("CSS files created successfully!")
print(f"feedback.css: {len(feedback_css_full)} characters")
print(f"sections.css: {len(sections_css_full)} characters")
