import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function chatWithAI(message: string, history: { role: string, parts: { text: string }[] }[] = []) {
  try {
    const chat = ai.chats.create({
      model: "gemini-3.1-pro-preview",
      config: {
        systemInstruction: "Bạn là 'Bé Na', một AI thấu cảm, chuyên gia tâm lý hỗ trợ người dùng ứng dụng 'Bắt Sóng'. Bạn luôn lắng nghe tích cực, không phán xét, không đưa ra lời khuyên sáo rỗng. Đặt câu hỏi gợi mở để người dùng chia sẻ. Nếu phát hiện từ khóa nguy hiểm (tự sát, cái chết, vô vọng), hãy cảnh báo nhẹ nhàng và khuyên họ dùng nút SOS hoặc gọi Hotline.",
      },
    });

    // We can't easily pass history to chats.create in this SDK version without managing it manually.
    // Let's just use generateContent for simplicity if history is complex, or just send the latest message.
    // Actually, we can use generateContent with contents array for history.
    
    const contents = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: msg.parts
    }));
    
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: contents,
      config: {
        systemInstruction: "Bạn là 'Bé Na', một AI thấu cảm, chuyên gia tâm lý hỗ trợ người dùng ứng dụng 'Bắt Sóng'. Bạn luôn lắng nghe tích cực, không phán xét, không đưa ra lời khuyên sáo rỗng. Đặt câu hỏi gợi mở để người dùng chia sẻ. Nếu phát hiện từ khóa nguy hiểm (tự sát, cái chết, vô vọng), hãy cảnh báo nhẹ nhàng và khuyên họ dùng nút SOS hoặc gọi Hotline. Trả lời ngắn gọn, ấm áp.",
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error chatting with AI:", error);
    return "Xin lỗi, tôi đang gặp chút khó khăn khi kết nối. Bạn có thể thử lại sau nhé.";
  }
}

export async function generateEmotionImage(emotionText: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Một bức tranh nghệ thuật, màu nước, thể hiện cảm xúc nhẹ nhàng, chữa lành, an ủi dựa trên tâm trạng này: "${emotionText}". Không có chữ trong hình.`,
          },
        ],
      },
      config: {
        // @ts-ignore
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: "1K"
        }
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
}

export async function transcribeAudio(base64Audio: string, mimeType: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            {
              inlineData: {
                data: base64Audio,
                mimeType: mimeType,
              },
            },
            {
              text: "Please transcribe this audio into Vietnamese text accurately.",
            },
          ],
        },
      ],
    });
    return response.text;
  } catch (error) {
    console.error("Error transcribing audio:", error);
    return null;
  }
}
