from flask import Flask, render_template, request, jsonify
from flask_restful import Api, Resource
from langchain.agents import load_tools, initialize_agent
from langchain.llms import OpenAI
from langchain.chains.conversation.memory import ConversationBufferMemory
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__, template_folder='frontend', static_folder='frontend')
api = Api(app)

llm = OpenAI(temperature=0)
tools = load_tools([])
memory = ConversationBufferMemory(memory_key="chat_history")
agent = initialize_agent(tools, llm, agent="conversational-react-description", memory=memory, verbose=False)

class ChatbotAPI(Resource):
    def post(self):
        data = request.get_json()
        user_input = data["message"]
        
        response = agent.run(user_input)  # Sends user input to chatbot
        
        return jsonify({"response": response})

@app.route('/')
def index():
    return render_template('index.html')

api.add_resource(ChatbotAPI, '/api/chatbot')

if __name__ == '__main__':
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0  # Desactivar el caché de los archivos estáticos
    app.run(debug=True)
