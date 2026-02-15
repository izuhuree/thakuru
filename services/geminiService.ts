
import { GoogleGenAI } from "@google/genai";
import { Feature } from '../types';

interface TranslationParams {
    sourceLang: string;
    targetLang: string;
}

function getPromptForFeature(feature: Feature, text: string, params?: any): string {
    switch (feature) {
        case Feature.SPEECH_TO_TEXT:
            return `TRANSCRIPTION TASK:
            Please listen to the provided audio or video and write down exactly what is being said in Dhivehi.
            
            STRICT RULES:
            - Use ONLY the Dhivehi Thaana script.
            - Provide a literal word-for-word transcription.
            - Do NOT translate to English.
            - Do NOT summarize or explain.
            - Do NOT include any introductory greetings or conversational fillers.
            - If there is background noise, ignore it and focus on the speech.
            - Output ONLY the transcribed Dhivehi text.`;
        
        case Feature.OCR:
            return `OCR TASK (DHIVEHI):
            Examine the provided image or PDF document and extract the text content exactly as it appears.
            
            STRICT RULES:
            - The content is likely in Dhivehi (Thaana script).
            - Output ONLY the extracted text.
            - Preserve the paragraph structure.
            - Do NOT include any introductory or concluding remarks.
            - Do NOT include any greetings or self-identification.
            - If there are images or graphs, ignore them and focus on the text.`;
            
        case Feature.PDF_TO_WORD:
            return `CONVERSION TASK (PDF TO DOCUMENT):
            Convert the content of the provided PDF file into a structured format suitable for a Word document.
            
            STRICT RULES:
            - The content is primarily in Dhivehi.
            - Preserve the original layout structure (Headings, Paragraphs, Lists) using Markdown formatting.
            - Ensure Thaana text is correctly extracted.
            - Do NOT summarize. Provide the full text content.
            - Do NOT include any introductory greetings or conversational fillers.
            - If there are tables, try to represent them as Markdown tables.
            - Output ONLY the content in Markdown format.`;

        case Feature.PARAPHRASE:
            return `Paraphrase the following Dhivehi text. Rewrite it in a clear, professional way while keeping exactly the same meaning. Focus on natural flow and sophisticated vocabulary in Dhivehi. \n\nIMPORTANT: Start directly with the paraphrased text. Do NOT include greetings or introductions.\n\nText: "${text}"`;
        case Feature.SUMMARIZE:
            return `Summarize the following Dhivehi text concisely. Extract the key messages and most important points. Provide the summary in clear Dhivehi. \n\nIMPORTANT: Start directly with the summary. Do NOT include greetings or introductions.\n\nText: "${text}"`;
        case Feature.GENERATE_IDEAS:
            return `CONTEXT: You are 'Holhuashi' (ހޮޅުއަށި), a wise, helpful, and creative Maldivian idea assistant.
            
            TASK: The user has a topic or rough idea (often for a story or essay). Act as a brainstorming partner. Expand on their idea, ask thought-provoking questions, or provide concrete steps to realize it within the Maldives context.
            
            STRICT RULES:
            - Tone: Helpful, encouraging, and professional.
            - NO INTRODUCTION: Do NOT include any introductory greetings, welcomes, or self-identifications.
            - Start directly with the ideas or discussion points.
            - Format: Use bullet points, numbered lists, or clear sections to organize the advice.
            - Context: Always relate back to the Maldives (culture, geography, economy) where applicable.
            - Output Language: Dhivehi.

            User's Input: "${text}"`;
        case Feature.CHECK_GRAMMAR:
            return `Please review the following Dhivehi text for any grammar and spelling errors. Provide the corrected text. If there are significant changes, briefly explain them in Dhivehi.\n\nIMPORTANT: Start directly with the correction. Do NOT include greetings or introductions.\n\nText: "${text}"`;
        case Feature.FIND_DEFINITION:
            return `Provide the definition (މާނަ) in Dhivehi for the word "${text}". Also, provide an example sentence (މިސާލު ޖުމުލަ) using the word. Do NOT include any introductory remarks.`;
        case Feature.IMPROVE_SENTENCE:
            return `Improve the following Dhivehi text for clarity and flow. Make long sentences shorter and simplify complex phrasing where possible. Provide the improved version.\n\nIMPORTANT: Start directly with the improved text. Do NOT include greetings or introductions.\n\nText: "${text}"`;
        case Feature.TRANSLATE:
            const { sourceLang, targetLang } = params as TranslationParams;
             return `You are an expert bilingual linguist and professional translator specializing in ${sourceLang} and ${targetLang}. 
             Your goal is to provide a high-quality, culturally accurate translation from ${sourceLang} to ${targetLang}.

            ### Specific Instructions for ${targetLang === 'Dhivehi' ? 'Dhivehi' : 'English'} target:
            ${targetLang === 'Dhivehi' ? 
              '- Prioritize "Dhivehi-vatha" (natural Dhivehi flow).\n- Avoid literal translations that sound like English sentences written in Thaana.\n- Use appropriate vocabulary for the context (formal/administrative vs. creative/narrative).' : 
              '- Capture the nuance and emotional weight of the original text.\n- Ensure the English is idiomatic and natural for a native speaker.'}

            ### Requirements:
            - Analyze tone and cultural idioms before translating.
            - Ensure the final output contains ONLY the translated text, no explanations, meta-commentary, or greetings.
            - Maintain the original formatting (paragraphs, lists) where applicable.

            Text to translate: "${text}"`;
            
        case Feature.DRAFT_LETTER:
            return `You are an expert Maldivian administrative writer. You will receive a JSON input containing the basic details and main points for a letter. Your task is to DRAFT a complete, formal Dhivehi letter (Rasmee Siti) based on these points.

            INPUT DATA (JSON):
            ${text}

            ### CONTENT INSTRUCTIONS:
            - **Body Content**: The 'body' field in the JSON contains the user's main points or raw ideas. **You MUST expand these points into full, professionally written sentences.**
            - Use formal administrative Dhivehi (Rasmee Bahuru).
            - Ensure correct grammar and polite tone.
            - Connect the points logically to form a coherent narrative.
            - NO INTRODUCTION: Do NOT include any greetings or introductory sentences before the letter content.

            ### MANDATORY LAYOUT RULES (Dhivehi is Right-to-Left):

            1. **Basmalah**: Must start with "بسم الله الرحمن الرحيم" (Arabic text, Centered).
            2. **Header (Top Right)**: 
               - [Sender Office Name]
               - [Sender Address / Island], ދިވެހިރާއްޖެ
            3. **Reference (Left Aligned)**: 
               - "ނަންބަރު: [Reference Placeholder]"
            4. **Recipient (Top Right)**:
               - [Recipient Title / Name]
            5. **Salutation**: "ވެދުން ސަލާމަށްފަހު ދަންނަވަމެވެ."
            6. **Body**: Professional tone, strictly Right-Aligned.
            7. **Closing**: "އިޙްތިރާމް ޤަބޫލު ކުރެއްވުން އެދެމެވެ."
            8. **Dates (Right Aligned)**: 
                - [Hijri Date]
                - [Gregorian Date]
            9. **Final Salutation (Left Aligned)**: "ޚާދިމްކުމް"
            10. **Signature Block (Left Aligned)**:
                - (ސޮއި)
                - [Sender Name]
                - [Sender Designation / Title]
            11. **Recipient Office (Bottom Right)**:
                - [Recipient Office Name]

            ### OUTPUT INSTRUCTIONS:
            - OUTPUT ONLY THE FINAL DHIVEHI LETTER.
            - USE MARKDOWN.`;
            
        case Feature.OUTLINE_ESSAY:
            return `Create a structured essay outline in Dhivehi for the topic "${text}". Start directly with the outline. No intro.`;
        case Feature.OUTLINE_STORY:
            return `Create a basic story outline in Dhivehi based on this idea: "${text}". Start directly with the outline. No intro.`;
        default:
            throw new Error('Unknown feature');
    }
}

export const runGeminiStream = async (
    feature: Feature, 
    inputText: string, 
    onChunk: (text: string) => void,
    params?: any
): Promise<void> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = getPromptForFeature(feature, inputText, params);
    
    const isComplexReasoningTask = [
        Feature.TRANSLATE, 
        Feature.CHECK_GRAMMAR, 
        Feature.DRAFT_LETTER,
        Feature.GENERATE_IDEAS,
        Feature.OUTLINE_STORY,
        Feature.OUTLINE_ESSAY
    ].includes(feature);
    
    const isMediaTask = [Feature.SPEECH_TO_TEXT, Feature.OCR, Feature.PDF_TO_WORD].includes(feature);
    const modelName = (isComplexReasoningTask || isMediaTask) ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';

    try {
        let contents: any;
        if (isMediaTask && params?.mediaData) {
            contents = {
                parts: [
                    { inlineData: { data: params.mediaData, mimeType: params.mimeType || 'audio/webm' } },
                    { text: prompt }
                ]
            };
        } else {
            contents = prompt;
        }

        const streamResponse = await ai.models.generateContentStream({
            model: modelName,
            contents: contents,
            config: {
                systemInstruction: "You are an expert Dhivehi writing assistant in the 'Thakuru Studio'. Focus on linguistic precision. STRICT RULE: Do NOT include greetings or intros. Start directly.",
                thinkingConfig: isComplexReasoningTask ? { thinkingBudget: 4000 } : undefined,
                temperature: feature === Feature.GENERATE_IDEAS ? 0.7 : 0.2,
            }
        });

        let fullText = "";
        for await (const chunk of streamResponse) {
            const chunkText = chunk.text;
            if (chunkText) {
                fullText += chunkText;
                onChunk(fullText);
            }
        }
    } catch (error) {
        console.error("Error calling Gemini API Stream:", error);
        throw new Error("މައްސަލައެއް ދިމާވެއްޖެ. އަލުން މަސައްކަތް ކޮށްލައްވާ.");
    }
};

export const runGemini = async (feature: Feature, inputText: string, params?: any): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = getPromptForFeature(feature, inputText, params);
    
    const isComplexReasoningTask = [
        Feature.TRANSLATE, 
        Feature.CHECK_GRAMMAR, 
        Feature.DRAFT_LETTER,
        Feature.OCR,
        Feature.PDF_TO_WORD,
        Feature.GENERATE_IDEAS
    ].includes(feature);
    
    const isMediaTask = [Feature.SPEECH_TO_TEXT, Feature.OCR, Feature.PDF_TO_WORD].includes(feature);
    const modelName = (isComplexReasoningTask || isMediaTask) ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';

    try {
        let contents: any;
        if (isMediaTask && params?.mediaData) {
            contents = {
                parts: [
                    { inlineData: { data: params.mediaData, mimeType: params.mimeType || 'audio/webm' } },
                    { text: prompt }
                ]
            };
        } else {
            contents = prompt;
        }

        const response = await ai.models.generateContent({
            model: modelName,
            contents: contents,
            config: {
                systemInstruction: "Expert Dhivehi writing assistant. No intros.",
                thinkingConfig: isComplexReasoningTask ? { thinkingBudget: 2000 } : undefined,
                temperature: isMediaTask ? 0.0 : 0.3,
            }
        });

        return response.text || "ނަތީޖާއެއް ނުފެނުނު.";
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("މައްސަލައެއް ދިމާވެއްޖެ. އަލުން މަސައްކަތް ކޮށްލައްވާ.");
    }
};
