import com.google.cloud.storage.*;
import com.sun.net.httpserver.*;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.Optional;

public class Main {
    public static void main(String[] args) throws Exception {
        String bucket = Optional.of(System.getenv("BUCKET")).get();
        Storage storage = StorageOptions.getDefaultInstance().getService();
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/", exchange -> serve(exchange, storage, bucket));
        server.start();
    }

    public static void serve(HttpExchange exchange, Storage storage, String bucket) throws IOException {
        byte[] response = storage.readAllBytes(bucket, "Kancolle_iOS_debug.js");
        exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
        exchange.sendResponseHeaders(200, response.length);
        exchange.getResponseBody().write(response);
        exchange.close();
    }
}
