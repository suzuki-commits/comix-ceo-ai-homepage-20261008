(() => {
  const image = document.querySelector('.hero-art img');
  image?.addEventListener('error', () => image.classList.add('missing'));
  const form = document.querySelector('#diagnosis-form');
  const result = document.querySelector('#diagnosis-result');
  const outcomes = [
    ['いつもの仕事を1つ思い浮かべてください。','3つの問いに答えると、次の一歩を表示します。'],
    ['人が担う理由を、もう一度確かめる。','判断や対話が価値になる仕事なら、人の時間として守りましょう。'],
    ['AIと人で、工程を分けてみる。','調査や下書きをAIへ渡し、判断と仕上げを人が担う形が候補です。'],
    ['AIへ渡す仕事の候補です。','目的・手順・出来上がりの形を3行で書き、今週1回試してみましょう。']
  ];
  form?.addEventListener('change', () => {
    const count = form.querySelectorAll('input:checked').length;
    result.innerHTML = '<span>'+count+' / 3</span><strong>'+outcomes[count][0]+'</strong><p>'+outcomes[count][1]+'</p>';
  });
  const button = document.querySelector('#copy-template');
  const text = document.querySelector('#template-text');
  const status = document.querySelector('#copy-status');
  button?.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(text?.textContent || ''); status.textContent='型をコピーしました。'; button.textContent='コピー済み'; }
    catch { status.textContent='コピーできませんでした。テキストを選択してコピーしてください。'; }
  });
})();
