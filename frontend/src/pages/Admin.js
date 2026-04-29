import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from "react-native";

export default function Admin() {
    const [words, setWords] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [form, setForm] = useState({
        word_in: "",
        word_ptbr: "",
        desc: "",
        category_id: null,
        selectedTags: [],
    });

    useEffect(() => {
        carregarDados();
    }, []);

    function carregarDados() {
        fetch("http://127.0.0.1:8000/api/admin")
            .then((res) => res.json())
            .then((data) => {
                setWords(data.words || []);
                setCategories(data.categories || []);
                setTags(data.tags || []);
            });
    }

    function toggleTag(tagId) {
        setForm((prev) => {
            const exists = prev.selectedTags.includes(tagId);

            return {
                ...prev,
                selectedTags: exists
                    ? prev.selectedTags.filter((t) => t !== tagId)
                    : [...prev.selectedTags, tagId],
            };
        });
    }

    function salvar() {
        fetch("http://127.0.0.1:8000/api/words", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        }).then(() => {
            carregarDados();
            limpar();
        });
    }

    function limpar() {
        setForm({
            word_in: "",
            word_ptbr: "",
            desc: "",
            category_id: null,
            selectedTags: [],
        });
    }

    function deletar(id) {
        fetch(`http://127.0.0.1:8000/api/words/${id}`, {
            method: "DELETE",
        }).then(() => carregarDados());
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Painel Admin</Text>

            {/* FORM */}
            <View style={styles.form}>
                <TextInput
                    placeholder="Palavra (EN)"
                    value={form.word_in}
                    onChangeText={(t) => setForm({ ...form, word_in: t })}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Tradução (PT-BR)"
                    value={form.word_ptbr}
                    onChangeText={(t) => setForm({ ...form, word_ptbr: t })}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Descrição"
                    value={form.desc}
                    onChangeText={(t) => setForm({ ...form, desc: t })}
                    style={styles.input}
                />

                {/* CATEGORIAS */}
                <Text style={styles.label}>Categoria:</Text>
                <View style={styles.row}>
                    {categories.map((cat) => (
                        <TouchableOpacity
                            key={cat.id}
                            style={[
                                styles.tag,
                                form.category_id === cat.id && styles.tagSelected,
                            ]}
                            onPress={() => setForm({ ...form, category_id: cat.id })}
                        >
                            <Text>{cat.nome}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* TAGS */}
                <Text style={styles.label}>Tags:</Text>
                <View style={styles.row}>
                    {tags.map((tag) => (
                        <TouchableOpacity
                            key={tag.id}
                            style={[
                                styles.tag,
                                form.selectedTags.includes(tag.id) && styles.tagSelected,
                            ]}
                            onPress={() => toggleTag(tag.id)}
                        >
                            <Text>{tag.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.button} onPress={salvar}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>

            {/* LISTA */}
            <Text style={styles.subtitle}>Palavras</Text>

            {words.map((w) => (
                <View key={w.id} style={styles.card}>
                    <Text style={styles.word}>
                        {w.word_in} - {w.word_ptbr}
                    </Text>
                    <Text>{w.desc}</Text>

                    <TouchableOpacity
                        style={styles.delete}
                        onPress={() => deletar(w.id)}
                    >
                        <Text style={{ color: "#fff" }}>Excluir</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: "#eee" },

    title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },

    form: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 15,
        marginBottom: 20,
    },

    input: {
        backgroundColor: "#f5f5f5",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },

    label: {
        marginTop: 10,
        marginBottom: 5,
        fontWeight: "bold",
    },

    row: {
        flexDirection: "row",
        flexWrap: "wrap",
    },

    tag: {
        backgroundColor: "#ddd",
        padding: 8,
        borderRadius: 10,
        margin: 5,
    },

    tagSelected: {
        backgroundColor: "#4A90E2",
    },

    button: {
        backgroundColor: "#3B5BA9",
        padding: 15,
        borderRadius: 20,
        marginTop: 10,
    },

    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
    },

    subtitle: {
        fontSize: 20,
        marginBottom: 10,
    },

    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 15,
        marginBottom: 10,
    },

    word: {
        fontWeight: "bold",
        fontSize: 16,
    },

    delete: {
        backgroundColor: "red",
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
    },
});