---
external: false
title: "typography test"
description: "her markdown ve markdoc elementini test eden bir yazı"
date: 2026-08-19
banner: /images/thinking.png
draft: true
---

## headings

# h1 başlık
## h2 başlık
### h3 başlık

---

## paragraphs & inline

Normal bir paragraf metni. Departure Mono ile satırlar arası boşluk ve font okunabilirliğini test ediyoruz. Uzun bir cümle olsun ki satır kırılmaları da görünsün: bu yazıtipinin piksel kılavuzuna uygun boyutlarda render edilmesi gerekiyor.

**kalın metin** ve *italik metin* yan yana.  
**kalın** ile *italik* bir arada: ***üçlü yıldız***.

Inline `kod parçası` burada görünür. Ve [bir link](https://github.com/odurgut) böyle görünür.

---

## lists

Sırasız liste:

- birinci madde
- ikinci madde
  - iç içe madde
  - bir tane daha
- üçüncü madde

Sıralı liste:

1. ilk adım
2. ikinci adım
3. üçüncü adım

---

## blockquote

> Basitlik, sofistike olmanın doruk noktasıdır.
> Uzun bir alıntı olsun ki satır kırılması da test edilsin. Burada ikinci satır devam ediyor.

---

## code blocks

TypeScript:

```typescript
function dither(pixel: number, threshold: number): number {
  return pixel > threshold ? 255 : 0;
}

const bayer4x4 = [
  [ 0,  8,  2, 10],
  [12,  4, 14,  6],
  [ 3, 11,  1,  9],
  [15,  7, 13,  5],
];
```

JavaScript:

```javascript
const frame = (timestamp) => {
  const delta = (timestamp - lastTime) / 1000;
  lastTime = timestamp;
  A += SPEED_A * delta;
  requestAnimationFrame(frame);
};
```

Shell:

```bash
# run npm build
npm run build

# push to codebase
git push origin master
```

---

## tables

| özellik       | değer         | notlar              |
|---------------|---------------|---------------------|
| font          | Departure Mono| pixel-perfect       |
| boyut         | 13px          | 11px'in katı        |
| line-height   | 1.85          | okunabilir          |
| letter-spacing| 0.01em        | hafif açık          |

---

## markdoc custom tags

### details / summary

{% details %}
{% summary %}
gizli içerik — tıkla
{% /summary %}

Bu kısım başta gizli. `details` ve `summary` markdoc tag'ları ile çalışıyor. İçinde **kalın**, *italik*, `kod` olabilir.

{% /details %}

### sup ve sub

H{% sub %}2{% /sub %}O molekülü. E = mc{% sup %}2{% /sup %} denklemi.

### abbr

{% abbr title="Artificial Intelligence" %}AI{% /abbr %} ve {% abbr title="User Interface" %}UI{% /abbr %} kısaltmaları.

### kbd

Kaydetmek için {% kbd %}⌘{% /kbd %} + {% kbd %}S{% /kbd %} basın. Terminali açmak için {% kbd %}⌃{% /kbd %} + {% kbd %}`{% /kbd %}.

### mark

Bu cümlede {% mark %}bu kısım vurgulanmış{% /mark %} olarak görünür.

---

## horizontal rule

Üstteki `---` yatay çizgi. Bir tane daha:

---

Son paragraf. Tipografi test tamamlandı.
