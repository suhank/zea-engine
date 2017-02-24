import sys

Protocol     = "HTTP/1.0"

if sys.argv[1:]:
    port = int(sys.argv[1])
else:
    port = 8080
server_address = ('127.0.0.1', port)

try:
	import BaseHTTPServer
	from SimpleHTTPServer import SimpleHTTPRequestHandler
	HandlerClass = SimpleHTTPRequestHandler
	ServerClass  = BaseHTTPServer.HTTPServer

	HandlerClass.protocol_version = Protocol
	httpd = ServerClass(server_address, HandlerClass)

except ImportError:
	import http.server
	import socketserver
	Handler = http.server.SimpleHTTPRequestHandler
	httpd = socketserver.TCPServer(("", port), Handler)


sa = httpd.socket.getsockname()
print "Serving HTTP on", sa[0], "port", sa[1], "..."
httpd.serve_forever()
