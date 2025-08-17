# Fix EditableText Components

Replace all remaining `EditableText` components with the stable `EditableInput` and `EditableTextarea` components.

## Pattern for Single-line Text:
```tsx
// Replace this:
<EditableText
  value={content.fieldName}
  onChange={(value) => handleContentChange('fieldName', value)}
  className="block"
  fieldId="fieldName"
/>

// With this:
{isEditing ? (
  <EditableInput
    value={content.fieldName}
    onChange={(value) => handleContentChange('fieldName', value)}
    className="block"
  />
) : (
  <span className="block">{content.fieldName}</span>
)}
```

## Pattern for Multi-line Text:
```tsx
// Replace this:
<EditableText
  value={content.fieldName}
  onChange={(value) => handleContentChange('fieldName', value)}
  multiline
  className="w-full"
  fieldId="fieldName"
/>

// With this:
{isEditing ? (
  <EditableTextarea
    value={content.fieldName}
    onChange={(value) => handleContentChange('fieldName', value)}
    className="w-full"
  />
) : (
  <span className="w-full whitespace-pre-line" style={{ whiteSpace: 'pre-line' }}>
    {content.fieldName}
  </span>
)}
```

## Components to Replace:

1. Line 769: whatWeAreTitle (single-line)
2. Line 776: whatWeAreDescription (multi-line)
3. Line 798: focusTitle (single-line)
4. Line 805: focusSubTitle (single-line)
5. Line 812: focusDescription (multi-line)
6. Line 825: focusFields items (single-line)
7. Line 847: focusFounders (multi-line)
8. Line 886: methodologyTitle (single-line)
9. Line 893: methodologySubTitle (single-line)
10. Line 900: methodologyDescription (multi-line)
11. Line 914: methodologyPillar1Title (single-line)
12. Line 922: methodologyPillar1Desc (single-line)
13. Line 936: methodologyPillar2Title (single-line)
14. Line 944: methodologyPillar2Desc (single-line)
15. Line 958: methodologyPillar3Title (single-line)
16. Line 966: methodologyPillar3Desc (single-line)
17. Line 980: methodologyPillar4Title (single-line)
18. Line 988: methodologyPillar4Desc (single-line)
19. Line 1002: methodologyPillar5Title (single-line)
20. Line 1010: methodologyPillar5Desc (single-line)
21. Line 1061: whatYouGetTitle (single-line)
22. Line 1067: whatYouGetDescription (multi-line)
23. Line 1082: journeyTitle (single-line)
24. Line 1088: journeyDescription (multi-line)
25. Line 1104: journeyStep1Title (single-line)
26. Line 1111: journeyStep1Desc (single-line)
27. Line 1124: journeyStep2Title (single-line)
28. Line 1131: journeyStep2Desc (single-line)
29. Line 1144: journeyStep3Title (single-line)
30. Line 1151: journeyStep3Desc (single-line)
31. Line 1164: journeyStep4Title (single-line)
32. Line 1171: journeyStep4Desc (single-line)
33. Line 1184: journeyStep5Title (single-line)
34. Line 1191: journeyStep5Desc (single-line)
35. Line 1208: ctaTitle (single-line)
36. Line 1214: ctaDescription (multi-line)
37. Line 1224: ctaApplyButton (single-line)
38. Line 1232: ctaLearnButton (single-line)
39. Line 1245: footerCopyright (single-line)
40. Line 1264: footerBlogsButton (single-line)

## Quick Find & Replace:

Search for: `<EditableText`
Replace with the appropriate pattern based on whether it's single-line or multi-line.

This will fix the focus issue and make all inputs stable.
