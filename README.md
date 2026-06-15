# CRM Consultoria Ju

Mini CRM estático para candidatas ao formulário *Quero uma vaga na Consultoria Particular com a Ju*. Leitura via **Google Sheets API**; escrita de status/notas via **Google Apps Script**.

## Conteúdo

| Caminho | Descrição |
|---------|-----------|
| `docs/index.html` | App CRM (GitHub Pages) |
| `docs/icons/` | Favicon THE |
| `apps-script/Code.gs` | Backend de escrita (colar na planilha) |

Configuração fica no **localStorage** (`the_crm_consultoria_ju_config`).

## 1. Preparar a planilha

Na aba **Form Responses 1**, adicione na **linha 1** (colunas N–Q):

| N | O | P | Q |
|---|---|---|---|
| Status CRM | Notas | Próximo passo | Atualizado em |

Compartilhe a planilha como **Qualquer pessoa com o link → Leitor** (para a API Key ler).

Spreadsheet ID: `1tE9hSzTUJZfFtnUs-j3dNn9WhRjam1guqTVCgcMGjMI`

## 2. Google Apps Script (escrita)

1. Abra a planilha → **Extensions → Apps Script**
2. Cole o conteúdo de [`apps-script/Code.gs`](apps-script/Code.gs)
3. **Project Settings → Script Properties** → adicione `CRM_PIN` = PIN escolhido (ex.: 6 dígitos)
4. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copie a URL do Web App (termina em `/exec`)

**Deployment ativo** (registo em [`SETUP-DEPLOY.md`](SETUP-DEPLOY.md)):

- Web App: `https://script.google.com/macros/s/AKfycbxCNv4zVCg6YW1J8lKh4LkR94FCQwc8UB1tIOcLMhBTnkehfHUp7nRxu80ctwq1EUmu/exec`
- Deployment ID: `AKfycbxCNv4zVCg6YW1J8lKh4LkR94FCQwc8UB1tIOcLMhBTnkehfHUp7nRxu80ctwq1EUmu`

## 3. Google Cloud (leitura)

1. [Google Cloud Console](https://console.cloud.google.com/) → ative **Google Sheets API**
2. Crie uma **API Key** (restrinja à Sheets API; opcional: referrer do GitHub Pages)
3. No CRM: preencha API Key, URL do Apps Script, PIN → **Salvar** → **Carregar leads**

## 4. GitHub Pages

Siga **[PUBLICAR.md](PUBLICAR.md)**.

URL sugerida: **https://lorenzo-sarcinelli-pascoal.github.io/crm-consultoria-ju/**

Teste local:

```bash
cd crm-consultoria-ju/docs && python3 -m http.server 8080
```

Abra `http://localhost:8080/index.html`.

## Status disponíveis

Nova · Contactada · Em conversa · Aprovada · Recusada · Lista de espera

## Segurança

- Não divulgue a URL do CRM publicamente
- PIN validado no Apps Script (não no front-end)
- API Key restrita à Sheets API
